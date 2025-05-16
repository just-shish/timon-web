import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography } from '@mui/material';
import PresetList from './components/PresetList';
import TimerDisplay from './components/TimerDisplay';
import PresetForm from './components/PresetForm';

const TimerApp = () => {
  const [presets, setPresets] = useState([]);
  const [currentPreset, setCurrentPreset] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPreset, setNewPreset] = useState({ name: '', intervals: [] });
  const [intervalName, setIntervalName] = useState('');
  const [intervalDuration, setIntervalDuration] = useState('');
  const [preEndCue, setPreEndCue] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    const savedPresets = localStorage.getItem('timer-presets');
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timer-presets', JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      if (timeLeft === 3) setPreEndCue(true);
      intervalRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      nextInterval();
    }
    return () => clearTimeout(intervalRef.current);
  }, [isRunning, timeLeft]);

  const startTimer = (preset) => {
    setCurrentPreset(preset);
    setCurrentIndex(0);
    setTimeLeft(preset.intervals[0].duration);
    setIsRunning(true);
    setPreEndCue(false);
  };

  const nextInterval = () => {
    setPreEndCue(false);
    if (!currentPreset) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentPreset.intervals.length) {
      setCurrentIndex(nextIndex);
      setTimeLeft(currentPreset.intervals[nextIndex].duration);
    } else {
      setIsRunning(false);
      setCurrentPreset(null);
    }
  };

  const prevInterval = () => {
    setPreEndCue(false);
    if (!currentPreset || currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setTimeLeft(currentPreset.intervals[prevIndex].duration);
  };

  const addIntervalToNewPreset = () => {
    if (!intervalName || !intervalDuration) return;
    const newInterval = {
      name: intervalName,
      duration: parseInt(intervalDuration),
    };
    setNewPreset({
      ...newPreset,
      intervals: [...newPreset.intervals, newInterval],
    });
    setIntervalName('');
    setIntervalDuration('');
  };

  const saveNewPreset = () => {
    if (!newPreset.name || newPreset.intervals.length === 0) return;
    setPresets([...presets, newPreset]);
    setNewPreset({ name: '', intervals: [] });
  };

  const deletePreset = (index) => {
    const updatedPresets = presets.filter((_, i) => i !== index);
    setPresets(updatedPresets);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Interval Timer
      </Typography>

      {!isRunning && (
        <>
          <Typography variant="h6">Saved Presets</Typography>
          <PresetList presets={presets} onStart={startTimer} onDelete={deletePreset} />
        </>
      )}

      {isRunning && currentPreset && (
        <TimerDisplay
          currentPreset={currentPreset}
          currentIndex={currentIndex}
          timeLeft={timeLeft}
          preEndCue={preEndCue}
          onPrev={prevInterval}
          onNext={nextInterval}
          onStop={() => setIsRunning(false)}
        />
      )}

      {!isRunning && (
        <PresetForm
          newPreset={newPreset}
          intervalName={intervalName}
          intervalDuration={intervalDuration}
          onChangeName={(name) => setNewPreset({ ...newPreset, name })}
          onChangeIntervalName={setIntervalName}
          onChangeIntervalDuration={setIntervalDuration}
          onAddInterval={addIntervalToNewPreset}
          onSavePreset={saveNewPreset}
        />
      )}
    </Container>
  );
};

export default TimerApp;
