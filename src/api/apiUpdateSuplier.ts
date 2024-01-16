import { userRequest } from "./requestMethod";

type dataProps = {
  id : number,
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

export const updateSuplier = async (dataSend: dataProps) => {
    console.log(dataSend)

  try {
    const res = await userRequest.put("/distributor/"+dataSend.id, dataSend);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
