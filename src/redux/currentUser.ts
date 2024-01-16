import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};
type initialProps = {
  currentUser: currentUserProps | null;
  isLoading: boolean;
  error: boolean;
};
const initialState: initialProps = {
  currentUser: null,
  isLoading: false,
  error: false,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<currentUserProps>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const {  loginSuccess,  logoutUser } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
