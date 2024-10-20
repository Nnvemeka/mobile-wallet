import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthUsers {
  username: string;
  password: string;
}

interface Authentication {
  authUsers: AuthUsers[];
  registeredUsers: string[];
  currentUser: string | undefined;
}

const initialState: Authentication = {
  authUsers: [],
  registeredUsers: [],
  currentUser: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<string>) => {
      state.registeredUsers = state.registeredUsers || [];
      state.registeredUsers.push(action.payload);
    },
    authenticateUser: (state, action: PayloadAction<string>) => {
      state.authUsers = state.authUsers || [];
      state.currentUser = action.payload;
    },
    authLogout: (state) => {
      state.currentUser = "";
    },
  },
});

export const { registerUser, authenticateUser, authLogout } = authSlice.actions;

export default authSlice.reducer;

export const selectRegisteredUsers = (state: RootState) =>
  state.authentication.registeredUsers;
export const selectAuthUsers = (state: RootState) =>
  state.authentication.authUsers;
export const selectCurrentUser = (state: RootState) =>
  state.authentication.currentUser;
