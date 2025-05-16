import React from 'react';
import { Box, TextField, Typography, Button, Stack, List, ListItem, ListItemText } from '@mui/material';
import IntervalList from './IntervalList';

const PresetForm = ({
  newPreset,
  intervalName,
  intervalDuration,
  onChangeName,
  onChangeIntervalName,
  onChangeIntervalDuration,
  onAddInterval,
  onSavePreset
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create New Preset
      </Typography>

      <TextField
        fullWidth
        label="Preset Name"
        value={newPreset.name}
        onChange={(e) => onChangeName(e.target.value)}
        margin="normal"
      />

      <Stack direction="row" spacing={2}>
        <TextField
          label="Interval Name"
          value={intervalName}
          onChange={(e) => onChangeIntervalName(e.target.value)}
          fullWidth
        />

        <TextField
          type="number"
          label="Duration (sec)"
          value={intervalDuration}
          onChange={(e) => onChangeIntervalDuration(e.target.value)}
          fullWidth
        />
      </Stack>

      <Button variant="contained" sx={{ mt: 2 }} onClick={onAddInterval}>
        Add Interval
      </Button>

      <IntervalList intervals={newPreset.intervals} />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={onSavePreset}
      >
        Save Preset
      </Button>
    </Box>
  );
};

export default PresetForm;
