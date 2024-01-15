import React, { useEffect, useState } from "react";
import "./ProvideDetail.css";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../../api/requestMethod";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { checkValidGmail } from "../../utils/checkValidGmail";
import { checkValidPhoneNumber } from "../../utils/checkValidPhoneNumber";
import distributor, { updateSuplierSuccess } from "../../redux/distributor";
import { updateSuplier } from "../../api/apiUpdateSuplier";
import ListProduct from "../../components/ListProduct/ListProduct";

type supilerProps = {
  id: number ;
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
type StatusProp = {
  type: string | undefined;
};
type ward = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
};
type district = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: ward[];
};
type city = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  districts: district[];
};
type input = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  distributorCode?: string;
  payment?: string;
  web?: string;
};
type dataProps = {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  address?: string;
  distributorCode?: string | undefined;
  payment?: string | undefined;
  description?: string | undefined;
  web?: string | undefined;
  createAt?: Date;
  updateAt?: Date;
};
type Props = {
  open: boolean;
};
const Button = ({ type }: StatusProp) => {
  return (
    <button className={`statusButton ${type}`}>{type ? type : "New"}</button>
  );
};



const ProvideDetail = ({open} : Props) => {
  const location = useLocation();
  const suplierId = location.pathname?.split("/")[2] || null;

  const [suplier, setSuplier] = useState<supilerProps>();

  const [created, setCreated] = useState<string>();

  const [updated, setUpdated] = useState<string>();

  const [more, setMore] = useState<boolean>(true);

  const navigate = useNavigate();
  const [provine, setProvine] = useState<city[]>([]);
  const [city, setCity] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [inputs, setInputs] = useState<input>({});
  const [description, setDescription] = useState<string>();

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    const getProvine = async () => {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=3",
        );
        setProvine(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvine();
  }, []);

  useEffect(() => {
    const getSup = async () => {
      try {
        const res = await userRequest.get("distributor/" + suplierId);
        setSuplier(res.data);
        const date = new Date(parseInt(res?.data?.createAt, 10));
        setCreated(date.toLocaleDateString());
        const update = new Date(parseInt(res?.data?.updateAt, 10));
        setUpdated(update.toLocaleDateString());
      } catch (error) {
        console.log(error);
      }
    };
    getSup();
  }, []);
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputs.name) {
      inputs.name = suplier?.name;
    }
    if (!inputs.address) {
      inputs.address = suplier?.address;
    }
    if (!inputs.email) {
      inputs.email = suplier?.email;
    }
    if (!inputs.phone) {
      inputs.phone = suplier?.phone;
    }
    if (!inputs.distributorCode) {
      inputs.distributorCode = suplier?.distributorCode;
    }
    if (!inputs.payment) {
      inputs.payment = suplier?.payment;
    }
    if (!inputs.web) {
      inputs.web = suplier?.web;
    }
    if (!description) {
      setDescription(suplier?.description);
    }
    if (!city || !ward || !district || !inputs.address) {
      inputs.address = suplier?.address;
    } else {
      console.log(city, district, ward);
      inputs.address = `${city}, ${district}, ${ward}, ${inputs.address}`;
    }
    if (!checkValidGmail(inputs.email)) {
      toast.error("Mail bị sai vui lòng nhập lại", {
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

    if (!checkValidPhoneNumber(inputs.phone)) {
      toast.error("SĐT không chính xác vui lòng nhập lại", {
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
    const dataSend: dataProps = {
      id: suplier?.id,
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      address: inputs.address,
      distributorCode: inputs.distributorCode,
      payment: inputs.payment,
      description: description,
      web: inputs.web,
      createAt: new Date(),
      updateAt: new Date(),
    };
    try {
      const res = await updateSuplier(dataSend);
      console.log(res.data);
      dispatch(
        updateSuplierSuccess({ id: suplier!.id, suplierUpdate: res.data }),
      );
      setSuplier(res.data);
      toast.success("Sửa thành công nhà cung cấp", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/suppliers");
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
    <>
      <div className="provide-container">
        <div className="info_container">
          <div className="info_detail">
            <p className="info_title">Id nhà cung cấp : </p>
            <p className="info_value"> {suplier?.id}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Tên nhà cung cấp : </p>
            <p className="info_value">{suplier?.name}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Mã nhà cung cấp : </p>
            <p className="info_value" style={{ color: "#00b4d8" }}>
              {suplier?.distributorCode}
            </p>
          </div>
          <div className="info_detail">
            <p className="info_title">Email nhà cung cấp : </p>
            <p className="info_value"> {suplier?.email}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">SĐT nhà cung cấp : </p>
            <p className="info_value">{suplier?.phone}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Địa chỉ nhà cung cấp : </p>
            <p className="info_value" style={{ maxWidth: "30rem" }}>
              {suplier?.address}
            </p>
          </div>
          <div className="info_detail">
            <p className="info_title">Web nhà cung cấp : </p>
            <p className="info_value"> {suplier?.web}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Phương thức thanh toán nhà cung cấp : </p>
            <p className="info_value"> {suplier?.payment}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Trạng thái nhà cung cấp : </p>
            <p className="info_value">
              <Button type={suplier?.status} />
            </p>
          </div>
          <div className="info_detail">
            <p className="info_title">Ngày tạo nhà cung cấp : </p>
            <p className="info_value">{created ? created : "Chưa cập nhật"}</p>
          </div>
          <div className="info_detail">
            <p className="info_title">Chỉnh sửa gần đây nhất : </p>
            <p className="info_value"> {updated ? updated : "Chưa cập nhật"}</p>
          </div>
          <div className="info_detail"></div>
          <div className="info_detail" style={{ gridColumn: 1 / 4 }}>
            <p className="info_title">Mô tả nhà cung cấp : </p>
            {suplier?.description?.length > 150 ? (
              more ? (
                <p className="info_value">
                  {suplier?.description?.slice(0, 100)}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setMore(!more)}
                  >
                    ...đọc tiếp
                  </span>
                </p>
              ) : (
                <p className="info_value">
                  {suplier?.description}
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => setMore(!more)}
                  >
                    ...thu gọn
                  </span>
                </p>
              )
            ) : (
              suplier?.description?.length
            )}
          </div>
        </div>
      </div>
      <ListProduct open={open} />
      <form className="provide-container1">
        <div className="titleContainer">
          <h2 className="title">Chỉnh sửa thông tin nhà cung cấp :</h2>
          <div className="btnsContainer">
            <button className="addSuplier" onClick={handleSave}>
              Lưu
            </button>
            <button className="help">
              <a
                href="https://support.sapo.vn/chi-tiet-nha-cung-cap"
                style={{ textDecoration: "none" }}
              >
                Trợ giúp
              </a>
            </button>
          </div>
        </div>
        <div className="formContainer">
          <div className="inputContainer">
            <label htmlFor="name">
              Tên nhà cung cấp<span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder={suplier?.name}
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="phone">
              SĐT nhà cung cấp<span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder={suplier?.phone}
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="email">
              Email nhà cung cấp<span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder={suplier?.email}
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="city">
              Tỉnh/Thành Phố<span style={{ color: "red" }}>* </span>:
            </label>
            <select
              name="city"
              id="city"
              className="input"
              onChange={(e) => setCity(e.target.value)}
            >
              <option
                value={suplier?.address?.split(", ")[0]}
                disabled
                selected
                hidden
              >
                {suplier?.address?.split(", ")[0]}
              </option>
              {provine?.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="district">
              Quận/Huyện<span style={{ color: "red" }}>* </span>:
            </label>

            <select
              name="district"
              id="district"
              className="input"
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option
                value={suplier?.address?.split(", ")[1]}
                disabled
                selected
                hidden
              >
                {suplier?.address?.split(", ")[1]}
              </option>
              {provine
                .find((item) => {
                  if (city) {
                    return item?.name === city;
                  } else {
                    return item?.name === suplier?.address?.split(", ")[0];
                  }
                })
                ?.districts?.map((item: district, index: number) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="ward">
              Phường/Thị trấn<span style={{ color: "red" }}>* </span>:
            </label>
            <select
              name="ward"
              id="ward"
              className="input"
              onChange={(e) => setWard(e.target.value)}
            >
              <option
                value={suplier?.address?.split(", ")[2]}
                disabled
                selected
                hidden
              >
                {suplier?.address?.split(", ")[2]}
              </option>
              {provine
                .find((item) => {
                  if (city) {
                    return item.name === city;
                  } else {
                    return item.name === suplier?.address?.split(", ")[0];
                  }
                })
                ?.districts.find((item) => {
                  if (district) {
                    return item.name === district;
                  } else {
                    return item.name === suplier?.address?.split(", ")[1];
                  }
                })
                ?.wards?.map((item: ward, index: number) => (
                  <option value={item.name} key={index}>
                    {item?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="inputContainer1">
            <label htmlFor="address">
              Địa chỉ cụ thể nhà cung cấp
              <span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="address"
              id="address"
              type="text"
              placeholder={suplier?.address?.split(", ")[3]}
              className="input1"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="distributorCode">
              Mã nhà cung cấp<span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="distributorCode"
              id="distributorCode"
              type="text"
              placeholder={suplier?.distributorCode}
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="payment">
              Phương thức thanh toán <span style={{ color: "red" }}>* </span>:
            </label>
            <select
              name="payment"
              id="payment"
              className="input"
              onChange={handleChange}
            >
              <option value={suplier?.payment} disabled selected hidden>
                {suplier?.payment}
              </option>
              <option value="COD">COD</option>
              <option value="Banking">Banking</option>
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="web">
              Địa chỉ Website nhà cung cấp
              <span style={{ color: "red" }}>* </span>:
            </label>
            <input
              name="web"
              id="web"
              type="text"
              placeholder={suplier?.web}
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer1">
            <label htmlFor="description">
              Chi tiết nhà cung cấp<span style={{ color: "red" }}>* </span>:
            </label>
            <textarea
              name="description"
              id="description"
              placeholder={suplier?.description}
              className="input2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ProvideDetail;
