import React from 'react';
import { Paper, Button, Typography, Box } from '@mui/material';

const PresetList = ({ presets, onStart, onDelete }) => {
  if (presets.length === 0) {
    return <Typography>No presets saved yet.</Typography>;
  }

  return (
    <Box>
      {presets.map((preset, idx) => (
        <Paper key={idx} sx={{ my: 1, p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => onStart(preset)}>
            Start: {preset.name}
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDelete(idx)}>
            Delete
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default PresetList;
