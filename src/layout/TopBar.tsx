import {
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiList from "@mui/material/List";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  FavoriteRounded,
  HelpRounded,
  PaidRounded,
} from "@mui/icons-material";
import { useLocation } from "react-router";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/currentUser";
import { RootState } from "../redux/store";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};


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
      width: `calc(100%)`,
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
  fontSize: 24,
  margin: theme.spacing(0, 0),
}));

interface TopBarProps {
  open: boolean;
}

const TitleForHeader: React.FC<{ title: string }> = ({ title }) => {
  switch (title) {
    case "items":
      return <p>Danh sách sản phẩm</p>;
    case "suppliers":
      return <p>Nhà cung cấp</p>;
    case "variants":
      return <p>Quản lý kho</p>;
    case "change":
      return <p>Điều chỉnh giá vốn</p>;
    case "purchase_orders":
      return <p>Nhập hàng</p>;
    case "stock_adjustments":
      return <p>Kiểm hàng</p>;
    case "order_suppliers":
      return <p>Đặt hàng nhập</p>;
    case "create_suppliers":
      return <p>Thêm nhà cung cấp</p>;
    case "supplier":
      return <p>Thông tin nhà cung cấp</p>;
    default:
      return <p>Tổng Quan</p>;
  }
};

const TopBar: React.FC<TopBarProps> = ({ open }) => {
  const [randomColor, setRandomColor] = useState(getRandomColor());

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const currentUser: currentUserProps | null = useSelector(
    (state: RootState) => state?.currentUser?.currentUser
  );

  const path = useLocation();
  const title = path.pathname.split("/")[1];
  const dispatch = useDispatch();
  const [openLogout, setOpenLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenLogout((prev) => !prev);
  };
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

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
        <Title>
          <TitleForHeader title={title} />
        </Title>
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
            onClick={handleClick}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                borderRadius: 50,
                backgroundColor: `${randomColor}`,
                width: "2.5rem",
                height: "2.5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: 26, color: "white" }}>
                {currentUser?.username[0]}
              </p>
            </ListItemIcon>
            <ListItemText
              primary={currentUser?.username}
              sx={{ color: "gray", ml: 1 }}
            />
            <Popper
              open={openLogout}
              anchorEl={anchorEl}
              placement="bottom-end"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <Typography
                      sx={{
                        p: 2,
                        width: "10rem",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Button
                        sx={{ margin: 0, padding: 0 }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
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

export default TopBar;
