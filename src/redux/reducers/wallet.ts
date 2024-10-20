import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Wallet {
  walletBalance: number;
}

const initialState: Wallet = {
  walletBalance: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    creditWallet: (state, action: PayloadAction<number>) => {
      state.walletBalance += action.payload;
    },
    debitWallet: (state, action: PayloadAction<number>) => {
      state.walletBalance -= action.payload;
    },
  },
});

export const { creditWallet, debitWallet } = walletSlice.actions;

export default walletSlice.reducer;

export const selectwalletBalance = (state: RootState) =>
  state.wallet.walletBalance;
