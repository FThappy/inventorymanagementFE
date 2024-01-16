import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./ListProduct.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ButtonForProduct from "../ButtonForProduct/ButtonForProduct";
type Props = {
  open: boolean;
};
type ProductProps = {
    id :number;
    productId : string;
    name :string;
    url :string;
    numInStock :number;
    distributorId :string;
    status :string;
    cost : number;


}
const fakeData = [
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

const ListProduct = ({ open }: Props) => {

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
      cellClassName: "productListId",
      headerClassName: "customHeader",
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
      cellClassName: "productListStock",
      headerClassName: "customHeader",
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
      headerClassName: "customHeader",
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
            <div className="productCon">
              <img className="productListImg" src={params.row.url} alt="" />
              {params.row.name}
            </div>
          </Grid>
        );
      },
    },

    {
      field: "numInStock",
      headerName: "Số sản phẩm trong kho",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 1,
      cellClassName: "productNumStock",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Số sản phẩm trong kho
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
      cellClassName: "productListStatus",
      headerClassName: "customHeader",
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
      cellClassName: "productListStock",
      headerClassName: "customHeader",
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
      cellClassName: "productListPrice",
      headerClassName: "customHeader",
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
            <ButtonForProduct type={params.value}/>
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
    <div className="itemContainer">
      <DataGrid
        rows={fakeData}
        disableRowSelectionOnClick
        columns={columns}
        slots={{
          footer: CustomFooterStatusComponent,
        }}
        sx={{
          height: windowWidth < 1800 ?370 : 400,
          width: windowWidth < 1800 ? (open ? "78rem" : "100%") : "100%",
        }}
      />
    </div>
  );
};

export default ListProduct;
