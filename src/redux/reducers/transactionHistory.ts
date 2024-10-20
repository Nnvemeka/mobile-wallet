import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Transfer {
  bankName: string;
  accountNumber: string;
  transactionDate: string;
  narration: string;
  amount: number;
}

interface BillPayment {
  name: string;
  price: number;
  description: string;
  transactionDate: string;
}

interface AirtimeTopup {
  name: string;
  amount: number;
  phone: string;
  transactionDate: string;
}

interface History {
  transfers: Transfer[];
  billsPayments: BillPayment[];
  airtimeTopups: AirtimeTopup[];
}

const initialState: History = {
  transfers: [],
  billsPayments: [],
  airtimeTopups: [],
};

export const history = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    addTransferHistory: (state, action: PayloadAction<Transfer>) => {
      state.transfers = state.transfers || [];
      state.transfers.push(action.payload);
    },
    addBillsHistory: (state, action: PayloadAction<BillPayment>) => {
      state.billsPayments = state.billsPayments || [];
      state.billsPayments.push(action.payload);
    },
    addAirtimeHistory: (state, action: PayloadAction<AirtimeTopup>) => {
      state.airtimeTopups = state.airtimeTopups || [];
      state.airtimeTopups.push(action.payload);
    },
  },
});

export const { addTransferHistory, addAirtimeHistory, addBillsHistory } =
  history.actions;

export default history.reducer;

export const selectTransferHistory = (state: RootState) =>
  state.transactionHistory.transfers;
export const selectBillsHistory = (state: RootState) =>
  state.transactionHistory.billsPayments;
export const selectAirtimeHistory = (state: RootState) =>
  state.transactionHistory.airtimeTopups;
