import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const TimerDisplay = ({
  currentPreset,
  currentIndex,
  timeLeft,
  preEndCue,
  onPrev,
  onNext,
  onStop
}) => {
  const currentInterval = currentPreset.intervals[currentIndex];
  const nextInterval = currentPreset.intervals[currentIndex + 1];

  return (
    <Box mb={4} textAlign="center">
      <Typography
        variant="h6"
        color={preEndCue ? 'error' : 'textPrimary'}
        sx={{ animation: preEndCue ? 'pulse 1s infinite' : 'none' }}
      >
        {currentInterval.name}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          height: 30,
          backgroundColor: '#e0e0e0',
          borderRadius: 1,
          my: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            backgroundColor: 'green',
            transition: 'width 1s linear',
            width: `${(timeLeft / currentInterval.duration) * 100}%`,
          }}
        />
      </Box>

      <Typography variant="h3">{timeLeft}s</Typography>
      <Typography variant="body2">Next: {nextInterval?.name || 'Done'}</Typography>

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button variant="contained" onClick={onPrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        <Button variant="contained" onClick={onNext}>Next</Button>
      </Stack>

      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={onStop}>
        Stop
      </Button>
    </Box>
  );
};

export default TimerDisplay;
