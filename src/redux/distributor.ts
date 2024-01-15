import { GridRowId } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type supilerProps = {
  id: number;
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
type updateSuplierProps = {
  id: number;
  suplierUpdate: supilerProps;
};

type initialProps = {
  suplier: supilerProps[];
  isLoading: boolean;
  error: boolean;
};

const initialState: initialProps = {
  suplier: [],
  isLoading: false,
  error: false,
};

const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<supilerProps[]>) => {
      state.suplier = action.payload;
    },
    addNewSuplier: (state, action: PayloadAction<supilerProps>) => {
      state.suplier?.push(action.payload);
    },
    updateSuplierSuccess: (
      state,
      action: PayloadAction<updateSuplierProps>,
    ) => {
      state.isLoading = false;
      state.suplier[
        state.suplier?.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.suplierUpdate;
    },
    deleteSuplierSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.suplier?.splice(
        state.suplier.findIndex((item) => item.id == action.payload),
        1,
      );
    },
    deleteMultiSuplierSuccess: (state, action: PayloadAction<GridRowId[]>) => {
      action.payload.map((itemss) =>{state.suplier?.splice(
        state.suplier.findIndex((item) => item.id == itemss),
        1,
      );})
      
    },
  },
});

export const {
  getAll,
  addNewSuplier,
  deleteSuplierSuccess,
  updateSuplierSuccess,
  deleteMultiSuplierSuccess,
} = distributorSlice.actions;
export default distributorSlice.reducer;
