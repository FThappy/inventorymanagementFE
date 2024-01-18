import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./ListProduct.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ButtonForProduct from "../ButtonForProduct/ButtonForProduct";
import { DeleteOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import { userRequest } from "../../api/requestMethod";

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
};
type Props = {
  open: boolean;
  product: ProductProps;
  totalPage: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number,
  ) => void;
  page: number;
  setProduct: React.Dispatch<React.SetStateAction<ProductProps[]>>; // Add this line
};
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

const ListProduct = ({
  open,
  product,
  totalPage,
  handleChange,
  page,
  setProduct,
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
            {params?.id}
          </Grid>
        );
      },
    },
    {
      field: "productId",
      headerName: "Mã sản phẩm",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 0.8,
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
            to={"/product_detail/" + params?.row?.id}
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
      field: "product",
      headerName: "Sản phẩm",
      // width: windowWidth < 1800 ? (open ? 150 : 250) : 250,
      flex: 1.1,
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
              <img
                className="productListImg"
                src={params?.row?.images[0]?.url}
                alt=""
              />
              {params?.row?.productName}
            </div>
          </Grid>
        );
      },
    },

    {
      field: "quantity",
      headerName: "Số sản phẩm trong kho",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 0.5,
      cellClassName: "productNumStock",
      headerClassName: "customHeader",
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
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "color",
      headerName: "Màu sắc",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 0.4,
      cellClassName: "productNumStock",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Màu sắc
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            <div
              className="color_order"
              style={{
                backgroundColor: params.value,
                border: "1px solid black",
              }}
            ></div>
          </Grid>
        );
      },
    },
    {
      field: "size",
      headerName: "Kích thước",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 0.35,
      cellClassName: "productNumStock",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Size
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params?.value}
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
            {params?.value?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Grid>
        );
      },
    },
    {
      field: "distributor",
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
            <ButtonForProduct type={params?.value} />
          </Grid>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      // width: windowWidth < 1800 ? 50 : 100,
      flex: 0.5,
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Xóa
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            <button
              style={{ border: "none", background: "none" }}
              onClick={(e) => handleDelete(e, params.row.productId)}
            >
              <DeleteOutline
                className="productListDelete"
                sx={{ fontSize: "2.3rem", marginLeft: "0.5rem" }}
              />
            </button>
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
            page={page + 1}
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
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string,
  ) => {
    e.preventDefault();
    try {
      await userRequest.delete("products/" + code);
    setProduct((prevProduct) =>
      prevProduct.filter((item) => item.productId !== code),
    );

      toast.success("Xóa thành công sản phẩm", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Lỗi sever vui lòng thử lại", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="itemContainer">
      {product && (
        <DataGrid
          rows={product}
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
      )}
    </div>
  );
};

export default ListProduct;
