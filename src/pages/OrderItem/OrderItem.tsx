import React, { useEffect, useState } from "react";
import './OrderItem.css'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { RootState } from '../../redux/store';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ButtonForProduct from "../../components/ButtonForProduct/ButtonForProduct";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
type supilerProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  distributorCode: string;
  address: string;
  payment: string;
  status: string;
  web: string;
  description: string;
  createAt: Date;
  updateAt: Date;
};
type Props = {
  open: boolean;
};
type ProductProps = {
  id: number;
  productId: string;
  name: string;
  url: string;
  numInStock: number;
  distributorCode: string;
  status: string;
  cost: number;
};
const fakeData : ProductProps[] = [
  {
    id: 1,
    productId: "P001",
    name: "Dior",
    url: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750",
    numInStock: 100,
    distributorCode: "SUPN0060",
    status: "active",
    cost: 100000,
  },
  {
    id: 2,
    productId: "P002",
    name: "Dior2",
    url: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750",
    numInStock: 100,
    distributorCode: "SUPN0060",
    status: "inactive",
    cost: 1000000,
  },
  {
    id: 3,
    productId: "P003",
    name: "Dior3",
    url: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750",
    numInStock: 100,
    distributorCode: "SUPN0060",
    status: "none",
    cost: 10000000,
  },
  {
    id: 4,
    productId: "P004",
    name: "Dior4",
    url: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750",
    numInStock: 100,
    distributorCode: "SUPN0060",
    status: "active",
    cost: 10000000,
  },
  {
    id: 5,
    productId: "P005",
    name: "Dior5",
    url: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750",
    numInStock: 100,
    distributorCode: "SUPN0060",
    status: "inactive",
    cost: 10000000,
  },
];
const OrderItem = ({ open }: Props) => {
  const distributor: supilerProps[] = useSelector(
    (state: RootState) => state?.suplier?.suplier,
  );

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns: GridColDef<ProductProps>[] = [
    {
      field: "id",
      headerName: "ID",
      // width: windowWidth < 1800 ? 50 : 100,
      flex: 0.3,
      cellClassName: "order_productListId",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          ID
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params.id}
          </Grid>
        );
      },
    },
    {
      field: "productId",
      headerName: "Mã sản phẩm",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 1,
      cellClassName: "order_productCode",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Mã sản phẩm
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Link
            to={"/supplier/" + params.row.id}
            className="link"
            style={{ width: "100%" }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <p
                style={{
                  color: "#00b4d8",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {params.value}
              </p>
            </Grid>
          </Link>
        );
      },
    },
    {
      field: "product",
      headerName: "Sản phẩm",
      // width: windowWidth < 1800 ? (open ? 150 : 250) : 250,
      flex: 1.2,
      headerAlign: "center",
      headerClassName: "order_customHeader",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Sản phẩm
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container alignItems="center">
            <div className="order_productCon">
              <img
                className="order_productListImg"
                src={params.row.url}
                alt=""
              />
              {params.row.name}
            </div>
          </Grid>
        );
      },
    },

    {
      field: "numInStock",
      headerName: "Số lượng",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 0.6,
      cellClassName: "order_productNumStock",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Số lượng
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params.value}
          </Grid>
        );
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      // width: windowWidth < 1800 ? (open ? 250 : 250) : 300,
      flex: 0.9,
      cellClassName: "order_productPricce",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Giá tiền
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container alignItems="center" sx={{ marginLeft: "2rem" }}>
            {params.value.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Grid>
        );
      },
    },
    {
      field: "distributorCode",
      headerName: "Mã nhà cung cấp",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 1.1,
      cellClassName: "order_productSupCode",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Mã nhà cung cấp
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Link
            to={"/supplier/" + params.row.id}
            className="link"
            style={{ width: "100%" }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <p
                style={{
                  color: "#00b4d8",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {params.value}
              </p>
            </Grid>
          </Link>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      // width: windowWidth < 1800 ? 250 : 250,
      flex: 0.8,
      cellClassName: "order_productStatus",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Trạng thái
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            <ButtonForProduct type={params.value} />
          </Grid>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      // width: windowWidth < 1800 ? 250 : 250,
      flex: 0.8,
      cellClassName: "order_Action",
      headerClassName: "order_customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Chọn sản phẩm
        </strong>
      ),
      renderCell: () => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            <button className="order_selectProduct">Thêm</button>
            {/* <button className="order_deleteProduct">Hủy</button> */}
          </Grid>
        );
      },
    },
  ];
  function CustomFooterStatusComponent() {
    return (
      <div className="containerSSS">
        <Stack spacing={2}>
          <Pagination
            count={10}
            color="primary"
            page={page + 1}
            onChange={(event, newPage) =>
              handlePageChange(
                event as React.ChangeEvent<HTMLInputElement>,
                newPage,
              )
            }
          />
        </Stack>
      </div>
    );
  }
  const handlePageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number,
  ) => {
    setPage(page - 1);
  };

  return (
    <div className="orderContainer">
      <div className="order_titContainer">
        <p className="order_title">Chọn mã nhà cung cấp :</p>
        <select className="order_select">
          {distributor.map((item) => (
            <option>{item?.distributorCode}</option>
          ))}
        </select>
      </div>
      <div className="order_itemContainer">
        <DataGrid
          rows={fakeData}
          disableRowSelectionOnClick
          columns={columns}
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          sx={{
            height: windowWidth < 1800 ? 370 : 400,
            width: windowWidth < 1800 ? (open ? "78rem" : "100%") : "100%",
          }}
        />
      </div>
      <div className="order_cart">
        <p className="order_title" style={{ marginTop: "0.5rem" }}>
          Giỏ hàng :
        </p>
        <div style={{ display: "flex" }}>
          <div className="order_cart_left">
            <div className="borderss">
              <img
                src="https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/466800/item/vngoods_09_466800.jpg?width=750"
                className="order_cart_img"
              />
              <div className="order_cart_left_detail_container">
                <div className="order_cart_left_detail">
                  <p className="detailProduct">
                    Mã sản phẩm : <span style={{ color: "#00b4d8" }}>P001</span>
                  </p>
                  <p className="detailProduct">Tên sản phẩm : Dior</p>
                  <p
                    className="detailProduct"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Màu sản phẩm :
                    <div
                      className="color_order"
                      style={{ backgroundColor: "yellow" }}
                    ></div>
                  </p>
                  <p className="detailProduct">Size sản phẩm : M</p>
                </div>
                <div className="order_cart_left_quantity">
                  <AddIcon sx={{ marginRight: "0.5rem", color: "black" }} />
                  1
                  <RemoveIcon sx={{ marginLeft: "0.5rem", color: "black" }} />
                </div>
                <div className="order_cart_left_cost">
                  Tổng số tiền :
                  <span style={{ color: "green", marginLeft: "0.5rem" }}>
                    {fakeData[0].cost.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="order_cart_right">
            <div className="order_cart_right_content">
              <p className="order_title" style={{ margin: "0.5rem" }}>
                Hóa đơn :
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0.5rem",
                  paddingBottom : "0.5rem",
                  borderBottom : "2px solid #e8e9eb"
                }}
              >
                <p style={{ fontSize: "1.5rem" }}>Tổng số tiền</p>
                <p style={{ fontSize: "1.5rem" }}>
                  {fakeData[0].cost.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <button className="acceptBtn">
                Đặt đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem
