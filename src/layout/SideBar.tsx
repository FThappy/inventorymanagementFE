import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/Sapo-logo.png"
import {  AddShoppingCartRounded, AddToPhotosRounded, AssignmentRounded,  CreditCardRounded,  Diversity3Rounded, HomeRounded, Inventory2Rounded, KeyboardArrowRight, KeyboardArrowUp, LocalShippingRounded, MenuBookRounded, PersonRounded, PointOfSaleRounded, QueryStatsOutlined, SettingsRounded, ShoppingBasketRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",

});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor : "#182537",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Image = styled("img")(({ theme }) => ({
  width : 200,
  padding: theme.spacing(1, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const ScrollBar = styled("div")(() => ({
  overflowX:"hidden",
  overflowY: "auto", // Cho phép cuộn theo chiều dọc
  maxHeight: "calc(100vh - 48px)", // Giảm chiều cao tối đa để phù hợp với chiều cao hiện tại của trình duyệt
  "&::-webkit-scrollbar": {
    width: 5,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#2B4263",
    borderRadius : 10,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#1F2937",
    // Track color, adjust as needed
  },
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#182537", // Đặt màu nền mong muốn ở đây
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#182537", // Đặt màu nền mong muốn ở đây
    },
  }),
}));
interface SideBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export default function SideBar ({ open, handleDrawerOpen, handleDrawerClose } : SideBarProps) {

    const [isExpanded, setExpanded] = React.useState(false);

    const handleToggle = () => {
      setExpanded(!isExpanded);
    };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Image src={logo} />
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ p: 0.5 }}
          >
            {open ? (
              <MoreVertIcon sx={{ color: "white", fontSize: 32, p: 0, m: 0 }} />
            ) : (
              <MenuIcon sx={{ color: "white", fontSize: 32, p: 0, m: 0 }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: "#FBFCFE" }} />
        <ScrollBar>
          <Box>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <HomeRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tổng quan"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <AssignmentRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Đơn hàng"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <LocalShippingRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Vận chuyển"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              {open ? (
                <Accordion
                  expanded={isExpanded}
                  onChange={handleToggle}
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    bgcolor: "transparent",
                    padding: 0,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      isExpanded ? (
                        <KeyboardArrowUp sx={{ color: "white" }} />
                      ) : (
                        <KeyboardArrowRight sx={{ color: "white" }} />
                      )
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: 0, margin: 0, height: "2.5rem" }}
                  >
                    <ListItem
                      disablePadding
                      sx={{ display: "block", padding: 0, margin: 0 }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          margin: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color: "#F3F4F5",
                          }}
                        >
                          <Inventory2Rounded sx={{ fontSize: 24 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Sản phẩm"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      margin: 0,
                      padding: 0,
                      paddingLeft: "3.2rem",
                    }}
                  >
                    <Link to="/items" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Danh sách sản phẩm"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/variants" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Quản lý kho"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/order_suppliers" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Đặt hàng nhập"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/purchase_orders" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Nhập hàng"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/stock_adjustments" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Kiểm hàng"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <ListItemButton>
                      <ListItemText
                        primary="Chuyển hàng"
                        sx={{ opacity: open ? 1 : 0, color: "white" }}
                      />
                    </ListItemButton>
                    <Link to="/suppliers" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Nhà cung cấp"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/change" className="link">
                      <ListItemButton>
                        <ListItemText
                          primary="Điều chỉnh giá vốn"
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </ListItemButton>
                    </Link>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#F3F4F5",
                      }}
                    >
                      <Inventory2Rounded sx={{ fontSize: 24 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sản phẩm"
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              )}

              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <PersonRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Khách hàng"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <CreditCardRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Loyalty"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <MenuBookRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sổ quỹ"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <QueryStatsOutlined sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Báo cáo"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ borderColor: "#FBFCFE" }} />
          <Box>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <PointOfSaleRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bán tại quầy"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <Diversity3Rounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Kênh Social"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <AddShoppingCartRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sàn TMĐT"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <ShoppingBasketRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Đặt hàng online"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ borderColor: "#FBFCFE" }} />
          <Box>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <AddToPhotosRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ứng dụng"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#F3F4F5",
                    }}
                  >
                    <SettingsRounded sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cấu hình"
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </ScrollBar>
      </Drawer>
    </>
  );
}
