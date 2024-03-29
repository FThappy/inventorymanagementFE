// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import SideBar from "./layout/SideBar";
import TopBar from "./layout/TopBar";
import { CssBaseline, styled } from "@mui/material";
import Home from "./pages/Home/Home";
import ListItem from "./pages/ListItem/ListItem";
import ImportItem from "./pages/ImportItem/Browser";
import ManageWarehouse from "./pages/ManageWarehouse/ManageWarehouse";
import ChangeCost from "./pages/ChangeCost/ChangeCost";
import OrderItem from "./pages/OrderItem/OrderItem";
import ExamItem from "./pages/ExamItem/ExamItem";
import Provide from "./pages/Provide/Provide";
import Login from "./pages/login/Login";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AddProduct from "./pages/AddProduct/AddProduct";
import ProvideDetail from "./pages/ProvideDetail/ProvideDetail";
import CreateProvide from "./pages/CreateProvide/CreateProvide";
import Browser from "./pages/ImportItem/Browser";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};

const Container = styled("div")(() => ({
  display: "flex",
}));

function App() {
  const [open, setOpen] = useState(false);
  const currentUser: currentUserProps | null = useSelector(
    (state: RootState) => state?.currentUser?.currentUser
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {currentUser ? (
        <Router>
          <CssBaseline />
          <Container>
            <SideBar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
            <div className="mainContainer">
              <TopBar open={open} />
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/add_product" element={<AddProduct />} />
                <Route path="/update_product/:code" element={<UpdateProduct />} />
                <Route path="/product_detail/:id" element={<ProductDetail />} />
                <Route path="/items" element={<ListItem open={open} />}></Route>
                <Route path="/suppliers" element={<Provide open={open} />} />
                <Route path="/variants" element={<ManageWarehouse />} />
                <Route path="/change" element={<ChangeCost />} />
                <Route path="/purchase_orders" element={<ImportItem />} />
                <Route
                  path="/stock_adjustments"
                  element={<ExamItem open={open} />}
                />
                <Route path="/stock_adjustments/:id" element={<Browser />} />
                <Route
                  path="/order_suppliers"
                  element={<OrderItem open={open} />}
                />
                <Route path="/create_suppliers" element={<CreateProvide />} />
                <Route
                  path="/supplier/:id"
                  element={<ProvideDetail open={open} />}
                />
              </Routes>
            </div>
          </Container>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
