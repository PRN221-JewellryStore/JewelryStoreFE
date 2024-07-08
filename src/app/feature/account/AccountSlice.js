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
  },
});

export const { setLoggedInAccount } = AccountSlice.actions;
const accountReducer = AccountSlice.reducer;
export { accountReducer };
