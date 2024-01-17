import { useLocation } from "react-router";
import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { userRequest } from "../../api/requestMethod";
import ButtonForProduct from "../../components/ButtonForProduct/ButtonForProduct";
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
  createdAt: Date;
  updatedAt: Date;
  distributor: string;
  description: string;
};
const ItemDetail = () => {
  const location = useLocation();
  const productId = location.pathname?.split("/")[2] || null;
  const [product, setProdcut] = useState<ProductProps>();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await userRequest.get("products/" + productId);
        setProdcut(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, [productId]);

  return (
    <div className="mt-1 h-full bg-[#F0F1F1]">
      <div className="m-auto ml-24 w-11/12 pt-5">
        <div>
          <h1 className="text-[25px] font-bold ">Item Detail</h1>
        </div>
        <div className="mt-2 flex h-[150px] w-11/12 bg-white">
          <div className="flex w-1/2">
            <div className="ml-7">
              <p className="pt-4">Trạng thái:</p>
              <p className="pt-4">Ngày tạo</p>
              <p className="pt-3">Ngày cập nhật</p>
            </div>
            <div className="ml-16">
              <div className="pt-2 ">
                : <ButtonForProduct type={product?.status} />
              </div>
              <p className="pt-2.5">
                : {product?.createdAt[2]}/{product?.createdAt[1]}/
                {product?.createdAt[0]}
              </p>
              <p className="pt-2">
                : {product?.updatedAt[2]}/{product?.updatedAt[1]}/
                {product?.updatedAt[0]}
              </p>
            </div>
          </div>
          <div className="flex w-1/2 justify-end">
            <img
              src={product?.images[0]?.url}
              alt=""
              className="mr-2 mt-10 h-[100px] w-[95px]"
            />
            {product?.images[1]?.url && (
              <img
                src={product?.images[2]?.url}
                alt=""
                className="mr-2 mt-10 h-[100px] w-[95px]"
              />
            )}
            {product?.images[2]?.url && (
              <img
                src={product?.images[2]?.url}
                alt=""
                className="mr-2 mt-10 h-[100px] w-[95px]"
              />
            )}
          </div>
        </div>
      </div>

      <div className="m-auto ml-24 h-3/4 w-11/12 pt-7">
        <div className="mb-10 flex h-full w-full flex-row">
          <div className="mb-10 mt-2 w-[92%] bg-white">
            <div className="h-[40px] border-b-2 border-b-[#D9D9D957]">
              <p className="px-5 pt-2  font-bold">
                Thông tin chi tiết phiên bản
              </p>
            </div>
            <div className="flex px-5 pt-3">
              <div className="">
                <div className="pl-3 font-medium">
                  <p>Tên phiên bản sản phẩm</p>
                  <p className="mt-2">Mã sản phẩm</p>
                  <p className="mt-2">Kích thước</p>
                  <p className="mt-2">Màu sắc</p>
                  <p className="mt-4">Giá nhập</p>
                  <p className="mt-2">Tồn kho</p>
                  <p className="mt-2">Có thể bán</p>
                </div>
              </div>
              <div className="ml-5 font-medium">
                <p className="text-[#2C7CC5]">: {product?.productName}</p>
                <p className="mt-2">: {product?.productId}</p>
                <p className="mt-2">: {product?.size}</p>
                <p className="mt-2 flex">
                  :{" "}
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginLeft: "1rem",
                      background: product?.color,
                    }}
                  ></div>
                </p>
                <p className="mt-2">
                  :
                  {product?.cost.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p className="mt-2">: {product?.quantity}</p>
                <p className="mt-2">: {product?.quantity}</p>
              </div>
              <div className="ml-80  h-[220px] w-[220px]">
                <img src={product?.images[0].url} alt="" />
              </div>
            </div>
            <div className="mt-10 flex">
              <p className="mt-3 min-w-fit pl-8 font-medium">Mô tả :</p>
              <p className=" pl-5 pr-10 pt-3  text-[14px] ">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
