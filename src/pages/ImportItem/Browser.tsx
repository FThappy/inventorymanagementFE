import React, { useEffect, useState } from "react";
import "./Browser.css";
import { useLocation } from "react-router";
import { userRequest } from "../../api/requestMethod";
import ButtonForProduct from "../../components/ButtonForProduct/ButtonForProduct";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

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
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};
const Browser = () => {
  const location = useLocation();
  const transId = location.pathname?.split("/")[2] || null;
  const [trans, setTrans] = useState<TransProp>();
  const [description, setDescription] = useState();

  useEffect(() => {
    const getTransById = async () => {
      try {
        const res = await userRequest.get("transcation/" + transId);
        setTrans(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransById();
  }, [transId]);

  const handleAccept = async () => {
    const dataSend = {
      id: transId,
      status: "approved",
      description: "thành công",
    };
    try {
      const res = await userRequest.put("transcation/status", dataSend);
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
      setTrans((prev) => ({
        ...prev,
        status: "approved",
        description: "Thành công",
      }));
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
  const handleWrong = async () => {
    if (!description) {
      toast.warning("Hãy nhập lỗi vào ô thông tin đơn hàng", {
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
      id: transId,
      status: "wrong",
      description: description,
    };
    try {
      const res = await userRequest.put("transcation/status", dataSend);
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
      setTrans((prev) => ({
        ...prev,
        status: "wrong",
        description: description,
      }));
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
  const handleDeclined = async () => {
    if (!description) {
      toast.warning("Hãy nhập lý do hủy đơn vào ô thông tin đơn hàng", {
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
      id: transId,
      status: "declined",
      description: description,
    };
    try {
      const res = await userRequest.put("transcation/status", dataSend);
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
      setTrans((prev) => ({
        ...prev,
        status: "declined",
        description: description,
      }));
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
  const currentUser: currentUserProps | null = useSelector(
    (state: RootState) => state?.currentUser?.currentUser,
  );

  return (
    <div className="browserContainer">
      <div className="browser_titContainer">
        <div style={{ display: "flex" }}>
          <p className="browser_title">Mã đơn hàng :</p>
          <p className="browser_info">{trans?.transcationId}</p>
        </div>
        <div style={{ display: "flex" }}>
          <p className="browser_title">Mã nhà cung cấp :</p>
          <p className="browser_info">{trans?.distributorCode}</p>
        </div>
        <div style={{ display: "flex" }}>
          <p className="browser_title" style={{ marginRight: "1rem" }}>
            Trạng thái :
          </p>
          <ButtonForProduct type={trans?.status} />
        </div>
      </div>
      {!(currentUser?.role === "EMPLOYEESTOCK") && (
        <div className="browser_btnContainer">
          <p className="browser_title">Duyệt đơn :</p>
          <button className="btnstatusApproved" onClick={handleAccept}>
            Nhận đơn thành công
          </button>
          <button className="statusDeclined" onClick={handleDeclined}>
            Hủy đơn
          </button>
          <button className="statusWrong" onClick={handleWrong}>
            Đơn có vấn đề
          </button>
        </div>
      )}
      <p
        className="browser_title"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        Thông tin đơn hàng :
      </p>
      <div style={{ display: "flex" }}>
        <div className="order_cart_left">
          {trans &&
            trans.detail.map((item) => (
              <div className="borderss">
                <img src={item.images[0].url} className="order_cart_img" />
                <div className="order_cart_left_detail_container">
                  <div className="order_cart_left_detail">
                    <p className="detailProduct">
                      Mã sản phẩm :{" "}
                      <span style={{ color: "#00b4d8" }}>{item.productId}</span>
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
                    <p className="detailProduct">Size sản phẩm : {item.size}</p>
                  </div>
                  <div className="order_cart_left_quantity">
                    Số lượng : {item.number ? item.number : 1}
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
                {trans?.totalCost.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="description" className="infor_trans">
                Thông tin đơn hàng :
              </label>
              <textarea
                name="description"
                id="description"
                placeholder={trans?.description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "24rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  border: "1px solid black",
                  height: "18rem",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browser;
