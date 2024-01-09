import { userRequest } from "./requestMethod";



export const deleteSuplier = async (id: number) => {

  try {
    const res = await userRequest.delete("/distributor/" + id);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
