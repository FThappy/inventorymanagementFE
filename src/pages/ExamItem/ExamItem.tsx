import React, { useEffect, useState } from "react";
import "./ExamItem.css";
import ListTranscation from "../../components/ListTranscation/ListTranscation";
import { userRequest } from "../../api/requestMethod";
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
  number : number;
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



const ExamItem = ({ open }: Props) => {
  const [trans, setTrans] = useState<TransProp[]>();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number>();
  const handlePageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number,
  ) => {
    setPage(page - 1);
  };
  useEffect(() => {
    const getTrans = async () => {
      try {
        const res = await userRequest.get("transcation/page", {
          params: { page: page },
        });
        setTrans(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTrans();
  }, [page]);
  useEffect(() => {
    const getTolTrans = async () => {
      try {
        const res = await userRequest.get("transcation/totalpage");
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTolTrans();
  }, []);
  console.log(trans);
  return (
    <div className="examContainer">
      <ListTranscation open={open} trans = {trans} totalPage = {totalPage} page={page} handleChange={handlePageChange} />
    </div>
  );
};

export default ExamItem;
