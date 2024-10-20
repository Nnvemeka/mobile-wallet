import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthUsers {
  username: string;
  password: string;
}

interface RegisteredUsers extends AuthUsers {
  email: string;
  phone: string;
}

interface Authentication {
  authUsers: AuthUsers[];
  registeredUsers: RegisteredUsers[];
  currentUser: AuthUsers;
}

const initialState: Authentication = {
  authUsers: [],
  registeredUsers: [],
  currentUser: {
    username: "",
    password: "",
  },
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisteredUsers>) => {
      state.registeredUsers = state.registeredUsers || [];
      state.registeredUsers.push(action.payload);
    },
    authenticateUser: (state, action: PayloadAction<AuthUsers>) => {
      state.authUsers = state.authUsers || [];
      state.authUsers.push(action.payload);
      state.currentUser = action.payload;
    },
    authLogout: (state) => {
      state.currentUser = {
        username: "",
        password: "",
      };
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
