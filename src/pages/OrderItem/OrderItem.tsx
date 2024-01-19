import React, { useEffect, useState } from "react";
import "./OrderItem.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ButtonForProduct from "../../components/ButtonForProduct/ButtonForProduct";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { userRequest } from "../../api/requestMethod";
import { DeleteOutline } from "@mui/icons-material";
import { toast } from "react-toastify";

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
  pick: boolean;
  number: number;
};

const OrderItem = ({ open }: Props) => {
  const distributor: supilerProps[] = useSelector(
    (state: RootState) => state?.suplier?.suplier,
  );
  const [suplier, setSuplier] = useState<string>(
    distributor[0].distributorCode,
  );
  const [inputs, setInputs] = useState<any>([]);

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
  const [product, setProduct] = useState<ProductProps[]>();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const handlePageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number,
  ) => {
    setPage(page - 1);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("products/page_code", {
          params: { page: page, code: suplier },
        });
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [suplier, page]);
  useEffect(() => {
    const getTolProduct = async () => {
      try {
        const res = await userRequest.get("products/totalpage_code", {
          params: { code: suplier },
        });
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTolProduct();
  }, [suplier]);
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
      flex: 0.9,
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
          Chọn
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {!params?.row.pick ? (
              <button
                className="order_selectProduct"
                onClick={() => {
                  handlePut(params.row);
                }}
              >
                Thêm
              </button>
            ) : (
              <button
                className="order_deleteProduct"
                onClick={() => {
                  handleDiscard(params.row);
                }}
              >
                Hủy
              </button>
            )}
          </Grid>
        );
      },
    },
  ];

  const handlePut = (params) => {
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[updatedProducts?.findIndex((item)=>item.id == params.id)].pick = true;
      updatedProducts[updatedProducts?.findIndex((item)=>item.id == params.id)].number = 1;

      return updatedProducts;
    });
    // console.log(product[product?.findIndex((item)=>item.id == params.id)]);
    setInputs((prev) => [...prev, product[product?.findIndex((item)=>item.id == params.id)]]);
  };
  console.log(inputs);

  const handleDiscard = (params) => {
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[updatedProducts?.findIndex((item)=>item.id == params.id)].pick = false;
      return updatedProducts;
    });
    setInputs((prev) => prev.filter((item) => item.id !== params.id));
  };

  function CustomFooterStatusComponent() {
    return (
      <div className="containerSSS">
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
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
  const handleIn = (item) => {
    setInputs((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === item.id && product.number < product.quantity) {
          return {
            ...product,
            number: product.number + 1,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleDe = (item) => {
    setInputs((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === item.id && product.number > 1) {
          return {
            ...product,
            number: product.number - 1,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };
  const handleSubmit = async () => {
    if (inputs.length <= 0) {
      toast.warning("Vui lòng chọn sản phẩm", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const dataSend = {
      transcationId:
        "TRANSC" + Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
      product: inputs?.map((item) => ({
        productId: item.productId,
        number: item.number,
      })),
      distributorCode: suplier,
      totalCost: inputs?.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue?.number * currentValue?.cost,
        0,
      ),
    };
    console.log(dataSend);
    try {
      const res = await userRequest.post("transcation/", dataSend);
      toast.success("Thành công", {
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
      console.log(error);
    }
  };

  return (
    <div className="orderContainer">
      <div className="order_titContainer">
        <p className="order_title">Chọn mã nhà cung cấp :</p>
        <select
          className="order_select"
          onChange={(e) => setSuplier(e.target.value)}
        >
          {distributor.map((item) => (
            <option value={item?.distributorCode}>
              {item?.distributorCode}
            </option>
          ))}
        </select>
      </div>
      <div className="order_itemContainer">
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
      <div className="order_cart">
        <p className="order_title" style={{ marginTop: "0.5rem" }}>
          Giỏ hàng :
        </p>
        <div style={{ display: "flex" }}>
          <div className="order_cart_left">
            {inputs &&
              inputs.map((item) => (
                <div className="borderss">
                  <img src={item.images[0].url} className="order_cart_img" />
                  <div className="order_cart_left_detail_container">
                    <div className="order_cart_left_detail">
                      <p className="detailProduct">
                        Mã sản phẩm :{" "}
                        <span style={{ color: "#00b4d8" }}>
                          {item.productId}
                        </span>
                      </p>
                      <p className="detailProduct">
                        Tên sản phẩm : {item.productName}
                      </p>
                      <p
                        className="detailProduct"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Màu sản phẩm :
                        <div
                          className="color_order"
                          style={{ backgroundColor: item.color }}
                        ></div>
                      </p>
                      <p className="detailProduct">
                        Size sản phẩm : {item.size}
                      </p>
                    </div>
                    <div className="order_cart_left_quantity">
                      <button
                        className="flex items-center	"
                        onClick={() => handleIn(item)}
                      >
                        <AddIcon
                          sx={{
                            marginRight: "0.5rem",
                            color: "black",
                            cursor: "pointer",
                          }}
                        />
                      </button>
                      {item.number ? item.number : 1}
                      <button
                        className="flex items-center	"
                        onClick={() => handleDe(item)}
                      >
                        <RemoveIcon
                          sx={{
                            marginLeft: "0.5rem",
                            color: "black",
                            cursor: "pointer",
                          }}
                        />
                      </button>
                    </div>
                    <div className="order_cart_left_cost">
                      Tổng số tiền :
                      <span style={{ color: "green", marginLeft: "0.5rem" }}>
                        {item &&
                          (item?.cost * item.number).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                  paddingBottom: "0.5rem",
                  borderBottom: "2px solid #e8e9eb",
                }}
              >
                <p style={{ fontSize: "1.5rem" }}>Tổng số tiền</p>
                <p style={{ fontSize: "1.5rem" }}>
                  {inputs &&
                    inputs
                      ?.reduce(
                        (accumulator, currentValue, index) =>
                          accumulator +
                          currentValue?.number * currentValue?.cost,
                        0,
                      )
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                </p>
              </div>
              <button className="acceptBtn" onClick={handleSubmit}>
                Đặt đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
