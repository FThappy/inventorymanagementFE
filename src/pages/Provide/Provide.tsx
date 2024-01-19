import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import "./Provide.css";
import { userRequest } from "../../api/requestMethod";
import Grid from "@mui/material/Grid";
import { DeleteOutline } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultiSuplierSuccess,
  deleteSuplierSuccess,
  getAll,
} from "../../redux/distributor";
import { toast } from "react-toastify";
import { deleteSuplier } from "../../api/apiDeleteSuplier";
import { RootState } from "../../redux/store";
import { deleteMulti } from "../../api/apiDeleteMulti";
import { utils, writeFile } from "xlsx";

type data = {
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
type StatusProp = {
  type: string;
};
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
const Button = ({ type }: StatusProp) => {
  return (
    <button className={`statusButton ${type}`}>{type ? type : "New"}</button>
  );
};
type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};
const Provide = ({ open }: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [data, setData] = useState<data[]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>(
    [],
  );

  const suplier: supilerProps[] = useSelector(
    (state: RootState) => state?.suplier?.suplier,
  );
  const currentUser: currentUserProps | null = useSelector(
    (state: RootState) => state?.currentUser?.currentUser,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const datas = async () => {
      try {
        const res = await userRequest.get(`/distributor/page`, {
          params: { page: page },
        });
        setData(res.data);
        dispatch(getAll(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    datas();
  }, [page, dispatch]);
  useEffect(() => {
    const total = async () => {
      try {
        const res = await userRequest.get(`/distributor/totalpage`, {
          params: { page: page },
        });
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    total();
  }, [page]);
  const handlePageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number,
  ) => {
    setPage(page - 1);
  };
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    try {
      await deleteSuplier(id);
      dispatch(deleteSuplierSuccess(id));
      toast.success("Xóa thành công nhà cung cấp", {
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
  const handleDeleteMulti = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await deleteMulti(rowSelectionModel);
      console.log(res);
      dispatch(deleteMultiSuplierSuccess(rowSelectionModel));
      toast.success("Xóa thành công nhà cung cấp", {
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

  const exportFile = () => {
    const data = suplier.map((item) => {
      const date = new Date(parseInt(item.createAt, 10));
      const created: string = date.toLocaleDateString();

      const update = new Date(parseInt(item.updateAt, 10));
      const updated: string = update.toLocaleDateString();

      const dataSend = {
        Id: item.id,
        "Mã nhà cung cấp": item.distributorCode,
        "Tên nhà cung cấp": item.name,
        Email: item.email,
        "SĐT Nhà cung cấp": item.phone,
        Status: item.status ? item.status : "Nhà cung cấp mới",
        "Địa chỉ web": item.web ? item.web : "Chưa cung cấp",
        "Mô tả": item.description,
        "Phương thức thanh toán": item.payment,
        "Địa chỉ": item.address,
        "Thời gian tạo": created,
        "Chỉnh sửa mới nhất": updated,
      };

      return dataSend;
    });

    const ws = utils.json_to_sheet(data);

    const wb = utils.book_new();

    // Đặt độ rộng của các cột
    ws["!cols"] = [
      { wpx: 50 }, // Id
      { wpx: 150 }, // Mã nhà cung cấp
      { wpx: 200 }, // Tên nhà cung cấp
      { wpx: 150 }, // Email
      { wpx: 150 }, // SĐT Nhà cung cấp
      { wpx: 200 },
      { wpx: 250 },
      { wpx: 300 },
      { wpx: 100 },
      { wpx: 300 },
      { wpx: 200 },
      { wpx: 200 },
    ];

    utils.book_append_sheet(wb, ws, "Data");

    writeFile(wb, "Danh sách nhà cung cấp.xlsx");
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

  const columns: GridColDef<supilerProps>[] = [
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
      field: "distributorCode",
      headerName: "Mã nhà cung cấp",
      // width: windowWidth < 1800 ? (open ? 250 : 300) : 250,
      flex: 1.3,
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
      field: "name",
      headerName: "Tên nhà cung cấp",
      // width: windowWidth < 1800 ? (open ? 150 : 250) : 250,
      flex: 1.2,
      // maxWidth : 100,
      headerClassName: "customHeader",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Tên nhà cung cấp
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container alignItems="center">
            <div className="productListName">
              {/* <img className="productListImg" src={params.row.url} alt="" /> */}
              {params.row.name}
            </div>
          </Grid>
        );
      },
    },

    {
      field: "phone",
      headerName: "Số điện thoại",
      // width: windowWidth < 1800 ? (open ? 200 : 250) : 200,
      flex: 1.1,
      cellClassName: "productListStock",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderHeader: () => (
        <strong
          style={{ fontWeight: "bold", fontSize: open ? "1rem" : "1.2rem" }}
        >
          Số điện thoại
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
      field: "email",
      headerName: "Email",
      // width: windowWidth < 1800 ? (open ? 250 : 250) : 300,
      flex: 1.1,
      cellClassName: "productListStatus",
      headerClassName: "customHeader",
      renderHeader: () => (
        <strong
          style={{
            fontWeight: "bold",
            marginLeft: "2rem",
            fontSize: open ? "1rem" : "1.2rem",
          }}
        >
          Email
        </strong>
      ),
      renderCell: (params) => {
        return (
          <Grid container alignItems="center" sx={{ marginLeft: "2rem" }}>
            {params.value}
          </Grid>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      // width: windowWidth < 1800 ? 250 : 250,
      flex: 1,
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
            <Button type={params.value} />
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
              {!(currentUser?.role === "EMPLOYEESTOCK") && (
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={(e) => handleDelete(e, params.row.id)}
                >
                  <DeleteOutline
                    className="productListDelete"
                    sx={{ fontSize: "2.3rem", marginLeft: "0.5rem" }}
                  />
                </button>
              )}
            </Grid>
          );
        },
      },
  ];

  return (
    <div className="provideContainer">
      <div className="btnsContainer">
        <button className="exportFile" onClick={exportFile}>
          <FileDownloadIcon />
          Xuất File
        </button>
        {!(currentUser?.role === "EMPLOYEESTOCK") && (
          <>
            <button className="deleteSuplier" onClick={handleDeleteMulti}>
              Xóa nhiều nhà cung cấp
            </button>
            <Link to="/create_suppliers" className="link">
              <button className="addSuplier">Thêm nhà cung cấp</button>
            </Link>
          </>
        )}

        <button className="help">
          <a
            href="https://support.sapo.vn/chi-tiet-nha-cung-cap"
            style={{ textDecoration: "none" }}
          >
            Trợ giúp
          </a>
        </button>
      </div>
      <DataGrid
        rows={suplier}
        disableRowSelectionOnClick
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel: GridRowId[]) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        autoPageSize
        slots={{
          footer: CustomFooterStatusComponent,
        }}
        sx={{
          height: windowWidth < 1800 ? 625 : 870,
          width: windowWidth < 1800 ? (open ? "78rem" : "100%") : "100%",
        }}
      />
    </div>
  );
};

export default Provide;
