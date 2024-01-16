// eslint-disable-next-line no-unused-vars
import {  userRequest } from "./requestMethod";

type dataProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
  distributorCode: string;
  payment: string;
  description: string;
  web: string;
  createAt: Date;
  updateAt: Date;
};


export const addSuplier = async (dataSend: dataProps) => {

  try {
    const res = await userRequest.post("/distributor/", dataSend);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
