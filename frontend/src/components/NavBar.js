import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Land Bank
        </Typography>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

