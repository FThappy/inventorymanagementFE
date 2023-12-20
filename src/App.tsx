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
import { CssBaseline, styled} from "@mui/material";
import Home from "./pages/Home/Home";
import ListItem from "./pages/ListItem/ListItem";
import ImportItem from "./pages/ImportItem/ImportItem";
import ManageWarehouse from "./pages/ManageWarehouse/ManageWarehouse";
import ChangeCost from "./pages/ChangeCost/ChangeCost";
import OrderItem from "./pages/OrderItem/OrderItem";
import ExamItem from "./pages/ExamItem/ExamItem";
import Provide from "./pages/Provide/Provide";


const Container = styled("div")(() => ({
  display: "flex",
}));

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
            <Route path="/items" element={<ListItem />} />
            <Route path="/suppliers" element={<Provide />} />
            <Route path="/variants" element={<ManageWarehouse />} />
            <Route path="/change" element={<ChangeCost />} />
            <Route path="/purchase_orders" element={<ImportItem />} />
            <Route path="/stock_adjustments" element={<ExamItem />} />
            <Route path="/order_suppliers" element={<OrderItem />} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;
