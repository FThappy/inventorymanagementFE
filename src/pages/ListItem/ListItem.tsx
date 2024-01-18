import { FaCheck } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import React, { useState, useEffect } from "react";
import './ListItem.css';
import { userRequest } from "../../api/requestMethod";
import ListProduct from "../../components/ListProduct/ListProduct";
import { Link } from "react-router-dom";
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
};
const ListItem = ({ open }: Props) => {
  const [product, setProduct] = useState<ProductProps[]>();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number>();
  const handlePageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number,
  ) => {
    setPage(page - 1);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("products/page", {
          params: { page: page },
        });
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [page]);
  useEffect(() => {
    const getTolProduct = async () => {
      try {
        const res = await userRequest.get("products/totalpage");
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTolProduct();
  }, []);
  return (
    <div>
      <div className="mx-1 flex-row">
        <div className="float-left m-1 w-fit px-2.5 py-4">
          <div className="flex flex-row">
            <div className="pl-3 pr-2.5 pt-1 text-green-600">
              <FaCheck />
            </div>
            {/* <div className=''>afjh</div> */}
            <div className="pr-4 text-lg"> Tất cả sản phẩm</div>
          </div>
          <div className="border-b-[3px] border-b-zinc-950"></div>
        </div>
        <div className="float-right m-4 flex h-[40px] w-fit cursor-pointer flex-row bg-[#33A0FF] text-lg text-white">
          <Link to={"/add_product"} className="link flex">
            <IoIosAdd className="ml-1 mt-2 text-2xl" />
            <p className="pr-3 pt-1.5">Thêm sản phẩm</p>
          </Link>
        </div>
      </div>
      <ListProduct
        open={open}
        product={product}
        setProduct={setProduct}
        page={page}
        totalPage={totalPage}
        handleChange={handlePageChange}
      />
    </div>
  );
};

export default ListItem
