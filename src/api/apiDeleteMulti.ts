import { GridRowId } from "@mui/x-data-grid";
import { userRequest } from "./requestMethod";

export const deleteMulti = async (dataSend: GridRowId[]) => {
  try {
    const res = await userRequest.post("/distributor/multi",dataSend);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
