import React from 'react'
import { AppBar, Avatar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Logout } from '@mui/icons-material';
import { useUserStore } from '../store/userStore';
import { stringAvatar } from '../utils/helpers';

const Topbar = () => {
    const [authUser, logout] = useUserStore((state) => [state.authUser, state.logout])
  
    return (
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'unset',
        }}
      >
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}> <Typography component={'h1'}>Task Manager</Typography>
            </Grid>
  
            <Grid item xs={6} sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center'
            }}>
                
                <Avatar>{stringAvatar(authUser.name ?? '')}</Avatar>
                <Typography mx={1} fontSize={14} fontWeight={400}>
                    {authUser.name ?? ''}
                </Typography>

                <IconButton
                    onClick={logout}
                    sx={{color: '#fff'}}
                >
                    <Logout sx={{ml: 2, cursor: 'pointer'}} />
                </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
  
  export default Topbar
  