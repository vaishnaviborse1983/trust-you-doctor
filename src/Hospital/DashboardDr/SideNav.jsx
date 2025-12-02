import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { withRouter } from 'react-router-dom';
import { IoDocumentText } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { BsFillMortarboardFill } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import Schedule from './dashpages/Schedule';
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { auth, app, storage, database } from '../Firebase/firebase.config';

// import { useHistory } from 'react-router-dom';

// import {useNavigate} from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideNav = (props) => {
  // const userId = props.id;
  // const { id } = useParams();
  const { history } = props;
  const id = props.id;

  useEffect(() => {
    console.log("SideNav", id);
  }, [])

  // history = useHistory();
  // const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [loading, setLoading] = useState(false); // Add loading state
  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setLoading(false);
      // You can redirect to the login page or any other desired behavior after logout
      history.replace('/');
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >

            <div>
              Hospital Section
            </div>
            <div>
              <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
                <RiLogoutBoxLine />
                Logout
              </div>
            </div>

          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>

          {/* onClick={()=>{navigate("/")}} */}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/profileHP/${id}`) }} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FaUserMd style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/LicenceHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoDocumentText style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"License"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/ScheduleHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FaCalendarAlt style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Schedule"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />


        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/QualificationHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <BsFillMortarboardFill style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Gallary"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>


        <Divider />


        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/AchievementHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 5,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <GiAchievement style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Achievement"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/paymentHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MdPayments style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Payment"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>



        <Divider />


        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/ArticleHP/${id}`) }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MdArticle style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Article"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>


        <Divider />


        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
              >
                <IoChatboxEllipses style={{ height: '3rem', width: '2rem' }} />
              </ListItemIcon>
              <ListItemText primary={"Chat"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>

    </Box>
  );
}

export default withRouter(SideNav);