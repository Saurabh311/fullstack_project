import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { Button } from '@mui/material'

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Springboot React Full Stack Application
          </Typography>
          <Button style={{ margin: '0 8px' }} variant="contained" color="success" href="/addStudent">Add Student</Button>
          <Button style={{ margin: '0 8px' }} variant="contained" color="success" href="/register">Register User</Button>
          <Button style={{ margin: '0 8px' }} variant="contained" color="success" href="/logout">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
