import * as React from 'react';
import Box from '@mui/material/Box';

import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import SideNav from './SideNav';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
const Main = () => {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
        <SideNav/>

        <div>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <h1>Main</h1>
            </Box>
        </div>
        </Box>
    </>
  )
}

export default Main