import React, { useEffect, useState } from "react";
import "./CreateProvide.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { checkValidGmail } from "../../utils/checkValidGmail";
import { checkValidPhoneNumber } from "../../utils/checkValidPhoneNumber";
import { addSuplier } from "../../api/apiAddSuplier";
import { useDispatch } from 'react-redux';
import { addNewSuplier } from "../../redux/distributor";

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

const CreateProvide = () => {
  const navigate = useNavigate();
  const [provine, setProvine] = useState<city[]>([]);
  const [city, setCity] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [inputs, setInputs] = useState<input>({});
  const [description, setDescription] = useState<string>();

  const dispatch = useDispatch()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
          "https://provinces.open-api.vn/api/?depth=3"
        );
        setProvine(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvine();
  }, []);
  const handleSave = async () => {
    if (
      !inputs.name ||
      !inputs.address ||
      !inputs.email ||
      !inputs.phone ||
      !inputs.distributorCode ||
      !inputs.payment ||
      !inputs.web ||
      !city ||
      !district ||
      !ward ||
      !description
    ) {
      toast.warn("Thiếu thông tin hãy điền đầy đủ", {
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
    const dataSend = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      address: `${city}, ${district}, ${ward}, ${inputs.address}`,
      distributorCode: inputs.distributorCode,
      payment : inputs.payment,
      description : description,
      web : inputs.web,
      createAt : new Date(),
      updateAt : new Date()
    };
    try {
      const res = await addSuplier(dataSend)
      console.log(res);
      dispatch(addNewSuplier(res.data));
      toast.success("Thêm thành công nhà cung cấp", {
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
      if(error?.response && error?.response?.data?.code == "3"){
         toast.error("Thông tin bị trùng vui lòng thử lại", {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         return
      }
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
    <div className="create-container">
      <div className="titleContainer">
        <h2 className="title">Vui lòng nhập các thông tin :</h2>
        <div className="btnsContainer">
          <button className="exportFile" onClick={() => navigate(-1)}>
            Hủy
          </button>
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
      <form className="formContainer">
        <div className="inputContainer">
          <label htmlFor="name">
            Tên nhà cung cấp<span style={{ color: "red" }}>* </span>:
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Tên nhà cung cấp"
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
            placeholder="Số điện thoại nhà cung cấp"
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
            placeholder="Email nhà cung cấp"
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
            <option value="" disabled selected hidden>
              Tỉnh thành phố
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
            <option value="" disabled selected hidden>
              Quận Huyện
            </option>
            {provine
              .find((item) => item.name === city)
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
            <option value="" disabled selected hidden>
              Phường/Thị trấn
            </option>
            {provine
              .find((item) => item.name === city)
              ?.districts.find((item) => item.name === district)
              ?.wards?.map((item: ward, index: number) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="inputContainer1">
          <label htmlFor="address">
            Địa chỉ cụ thể nhà cung cấp<span style={{ color: "red" }}>* </span>:
          </label>
          <input
            name="address"
            id="address"
            type="text"
            placeholder="Địa chỉ cụ thể nhà cung cấp"
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
            placeholder="Mã nhà cung cấp"
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
            <option value="" disabled selected hidden>
              Phương thức thanh toán
            </option>
            <option value="COD">COD</option>
            <option value="Banking">Banking</option>
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="web">
            Địa chỉ Website nhà cung cấp<span style={{ color: "red" }}>* </span>
            :
          </label>
          <input
            name="web"
            id="web"
            type="text"
            placeholder="Địa chỉ Website nhà cung cấp"
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
            placeholder="Chi tiết nhà cung cấp"
            className="input2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProvide;
