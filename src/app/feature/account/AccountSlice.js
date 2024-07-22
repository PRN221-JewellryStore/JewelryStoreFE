import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: {
    id: "",
    username: "",
    email: "",
    role: "",
  },
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoggedInAccount(state, action) {
      state.loggedIn = action.payload;
    },
    logout(state) {
      state.loggedIn = initialState.loggedIn;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setLoggedInAccount, logout } = AccountSlice.actions;
const accountReducer = AccountSlice.reducer;
export { accountReducer };
