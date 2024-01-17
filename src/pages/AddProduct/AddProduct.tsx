import "./AddProduct.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { userRequest } from "../../api/requestMethod";

const ItemDetail = () => {
  const [fileUrl, setFileUrl] = useState<string[]>();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);

    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setFiles(() => [...fileList]);

      fileList.forEach((file, index) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result) {
            console.log(reader.result as string);
            setFileUrl((prev) => {
              return {
                ...prev,
                [index]: reader.result as string,
              };
            });
            //  setFileUrl((prevUrls) => [...prevUrls, reader.result as string]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };
  const [name, setName] = useState<string>();
  const [productCode, setProductCode] = useState<string>();
  const [supplierCode, setSupplierCode] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [cost, setCost] = useState<number>();
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  const [quantity, setQuantity] = useState<number>();

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !name ||
      !productCode ||
      !supplierCode ||
      !description ||
      !cost ||
      !size ||
      !color ||
      !quantity
    ) {
      toast.error("Điền đầy đủ các thông tin", {
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
    const formData = new FormData();
    // Thêm thông tin sản phẩm vào FormData
    formData.append("productName", name);
    formData.append("productId", productCode);
    formData.append("distributor_code", supplierCode);
    formData.append("description", description);
    formData.append("cost", String(cost || 0)); // Chuyển giá trị cost thành chuỗi
    formData.append("size", size);
    formData.append("color", color);
    formData.append("quantity", String(quantity || 0));

    // Thêm file ảnh vào FormData
    files.forEach((file) => {
      formData.append(`imageFiles`, file);
    });
    try {
      const res = await userRequest.post("products/", formData);
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
      console.log(res.data);
    } catch (error) {
      if (error.response.data.code == 2) {
        toast.error("Mã sản phẩm đã tồn tại", {
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
      if (error.response.data.code == 3) {
        toast.error("Nhà cung cấp không tồn tại", {
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
      toast.error("Lỗi sever", {
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
    <div className="h-full bg-[#F0F1F1]">
      <div className="mx-[60px] flex w-11/12 pt-7">
        <div className="w-[55%]">
          <div className="mr-10 h-[440px] bg-white">
            <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
              <p className="px-5 pt-2  font-bold">Thông tin chung</p>
            </div>
            <div className="mx-14 mt-2">
              <form action="">
                <label htmlFor="ten_sp" className="flex">
                  Tên sản phẩm <p className="text-red-600">&nbsp;*</p>
                </label>
                <input
                  type="text"
                  id="ten_sp"
                  placeholder="Nhập tên sản phẩm"
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex">
                  <div className="mt-2 w-full">
                    <label htmlFor="ma_sp" className="flex">
                      Mã sản phẩm / SKU
                      <p className="text-red-600">&nbsp;*</p>
                    </label>
                    <input
                      type="text"
                      id="ma_sp"
                      placeholder="Nhập mã sản phẩm / SKU"
                      className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                      required
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                    <label htmlFor="ma_sp" className="mt-2 flex">
                      Mã nhà cung cấp
                      <p className="text-red-600">&nbsp;*</p>
                    </label>
                    <input
                      type="text"
                      id="ma_sp"
                      placeholder="Mã nhà cung cấp"
                      className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                      required
                      onChange={(e) => setSupplierCode(e.target.value)}
                    />
                  </div>
                </div>
                <label htmlFor="mo_ta" className="mt-3 flex">
                  Mô tả <p className="text-red-600">&nbsp;*</p>
                </label>
                <textarea
                  name="mo_ta"
                  id="mo_ta"
                  placeholder="Nhập mô tả ( Tối đa 200 ký tự )"
                  maxLength={200}
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1 pb-[80px]"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* <input type="text" id="name_product" placeholder="Nhập mô tả ..." className="border-[1px] border-slate-500 rounded w-full p-1 mt-1 pb-[160px]" required />  */}
              </form>
            </div>
          </div>

          <div className="mr-10 mt-3 h-[150px] bg-white">
            <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
              <p className="px-5 pt-2  font-bold">Giá sản phẩm</p>
            </div>
            <div className="mx-14 mt-2">
              <form action="">
                <label htmlFor="gia_le" className="mt-2  flex">
                  Giá Sản Phẩm
                </label>
                <input
                  type="number"
                  id="gia_le"
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                  onChange={(e) => setCost(parseInt(e.target.value, 10))}
                />
              </form>
            </div>
          </div>

          <div className="mr-10 mt-3 h-[140px] bg-white">
            <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
              <p className="px-5 pt-2  font-bold">Ảnh sản phẩm</p>
            </div>
            <div className="mx-1 mt-1 flex h-full w-11/12 justify-start pr-3">
              <div className="h-[65%] w-[15%] bg-[#F0F1F1] pt-8 text-center">
                <label htmlFor="avatar">+</label>
                <input
                  id="avatar"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
              {fileUrl &&
                Object.values(fileUrl as { [s: string]: string }).map(
                  (file, index) => (
                    <img
                      key={index}
                      src={file}
                      alt={`Image ${index}`}
                      className="mx-1 h-[90px] w-[90px]"
                    />
                  ),
                )}
            </div>
          </div>
        </div>
        <div className="h-[400px] w-2/5 bg-white">
          <div className="mr-10 mt-3 h-[210px] bg-white">
            <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
              <p className="px-5 pt-2  font-bold">Chi tiết sản phẩm</p>
            </div>
            <div className="mx-14 mt-2">
              <form action="">
                <label htmlFor="so_luong" className="mt-2  flex">
                  Số lượng
                </label>
                <input
                  type="number"
                  id="so_luong"
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />

                <label htmlFor="kich_thuoc" className="mt-2  flex">
                  Kích thước
                </label>
                <select
                  id="kich_thuoc"
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>

                <label htmlFor="mau_sac" className="mt-2  flex">
                  Màu sắc
                </label>
                <input
                  type="text"
                  id="mau_sac"
                  className="mt-1 w-full rounded border-[1px] border-slate-500 p-1"
                  onChange={(e) => setColor(e.target.value)}
                />
                <button
                  className=" mt-5 flex h-[40px] w-full items-center	 justify-center  bg-[#33A0FF]	text-lg text-white"
                  onClick={handleAdd}
                >
                  Thêm sản phẩm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
