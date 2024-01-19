import "./ListTranscation.css";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ButtonForProduct from "../ButtonForProduct/ButtonForProduct";

type Images = {
  id: number;
  productId: string;
  url: string;
};
type ProductProps = {
  id: number;
  productId: string;
  productName: string;
  quantity: number;
  quantitySold: number;
  cost: number;
  color: string;
  size: string;
  status: string;
  images: Images;
  createAt: Date;
  updateAt: Date;
  distributor: string;
  description: string;
  number: number;
};
type TransProp = {
  id: number;
  transcationId: string;
  distributorCode: string;
  totalCost: number;
  status: string;
  detail: ProductProps[];
  createdAt: Date;
  updatedAt: Date;
};
type Props = {
  open: boolean;
  trans: TransProp[];
  totalPage: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number,
  ) => void;
  page: number;
};
const ListTranscation = ({
  open,
  trans,
  totalPage,
  handleChange,
  page,
}: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const columns: GridColDef<TransProp>[] = [
    {
      field: "id",
      headerName: "ID",
      // width: windowWidth < 1800 ? 50 : 100,
      flex: 0.3,
      cellClassName: "transListId",
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
            {params?.id}
          </Grid>
        );
      },
    },
    {
      field: "transcationId",
      headerName: "Mã giao dịch",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 0.8,
      cellClassName: "productListStock",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Mã giao dịch
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Link
            to={"/stock_adjustments/" + params?.row?.id}
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
                {params?.value}
              </p>
            </Grid>
          </Link>
        );
      },
    },
    {
      field: "distributorCode",
      headerName: "Mã nhà cung cấp",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 1.1,
      cellClassName: "transListSuplier",
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
          <Grid container justifyContent="center" alignItems="center">
            <p
              style={{
                color: "#00b4d8",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {params?.value}
            </p>
          </Grid>
        );
      },
    },
    {
      field: "totalCost",
      headerName: "TotalCost",
      // width: windowWidth < 1800 ? (open ? 250 : 250) : 300,
      flex: 0.9,
      cellClassName: "transListPrice",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Tổng tiền
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container alignItems="center" sx={{ marginLeft: "2rem" }}>
            {params?.value?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Grid>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      // width: windowWidth < 1800 ? (open ? 250 : 250) : 300,
      flex: 0.9,
      cellClassName: "transListPrice",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Ngày tạo
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params?.value[2]}/ {params?.value[1]}/ {params?.value[0]}
          </Grid>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      // width: windowWidth < 1800 ? (open ? 250 : 250) : 300,
      flex: 0.9,
      cellClassName: "transListPrice",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Cập nhật
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params?.value[2]}/ {params?.value[1]}/ {params?.value[0]}
          </Grid>
        );
      },
    },

    {
      field: "status",
      headerName: "Trạng thái",
      // width: windowWidth < 1800 ? 250 : 250,
      flex: 0.8,
      cellClassName: "transListStatus",
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
            <ButtonForProduct type={params?.value} />
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
            count={totalPage}
            color="primary"
            page={page+1}
              onChange={(event, newPage) =>
                handleChange(
                  event as React.ChangeEvent<HTMLInputElement>,
                  newPage,
                )
              }
          />
        </Stack>
      </div>
    );
  }

  return (
    <div className="itemContainer">
      {trans && (
        <DataGrid
          rows={trans}
          disableRowSelectionOnClick
          columns={columns}
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          sx={{
            height: windowWidth < 1800 ? 600 : 700,
            width: windowWidth < 1800 ? (open ? "78rem" : "100%") : "100%",
          }}
        />
      )}
    </div>
  );
};

export default ListTranscation;
