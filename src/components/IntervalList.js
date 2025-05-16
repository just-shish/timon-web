import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const IntervalList = ({ intervals }) => {
  return (
    <List>
      {intervals.map((intv, i) => (
        <ListItem key={i}>
          <ListItemText primary={`${intv.name} - ${intv.duration}s`} />
        </ListItem>
      ))}
    </List>
  );
};

export default IntervalList;
