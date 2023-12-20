import {  Box, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiList from '@mui/material/List';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountBoxRounded,  FavoriteRounded, HelpRounded, PaidRounded } from '@mui/icons-material';
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% )`,
  height: "4.5rem",
  [theme.breakpoints.up("sm")]: {
    width: `calc(100%)`,
    height: "4.2rem",
    ...(open && {
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  [theme.breakpoints.up("xl")]: {
    width: `calc(100% )`,
    height: "4.6rem",
    ...(open && {
      width: `calc(100%)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  backgroundColor: "white",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% )`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const List = styled(MuiList)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: "black",
  margin: theme.spacing(0, 3),
}));
const Title = styled("h3")(({ theme }) => ({
  fontSize : 24,
  margin: theme.spacing(0, 0),
}));

interface TopBarProps {
  open: boolean;

}

const TopBar: React.FC<TopBarProps> = ({ open }) => {
  return (
    <AppBar position="static" open={open}>
      <Box
        sx={{
          height: "4.2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
          p: 1,
          ml: 8,
          mr: 6,
        }}
      >
        <Title>Title</Title>
        <List>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <PaidRounded sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Vay vốn kinh doanh"
              sx={{ color: "gray", ml: 1 }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <HelpRounded sx={{ fontSize: 24, minWidth: 0 }} />
            </ListItemIcon>
            <ListItemText primary="Trợ giúp" sx={{ color: "gray", ml: 1 }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <FavoriteRounded sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Góp ý" sx={{ color: "gray", ml: 1 }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <AccountBoxRounded sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Người dùng" sx={{ color: "gray", ml: 1 }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <NotificationsIcon sx={{ fontSize: 24, color: "#2196f3" }} />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
    </AppBar>
  );
};

export default TopBar
