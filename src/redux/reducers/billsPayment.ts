import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TV {
  name: string;
  price: number;
}

interface Data {
  name: string;
  price: number;
  data: string;
}

interface Electricity {
  name: string;
  price: number;
  unit: string | number;
}

interface BillsPayment {
  tv: TV[];
  data: Data[];
  electricity: Electricity[];
}

const initialState: BillsPayment = {
  tv: [],
  data: [],
  electricity: [],
};

export const billsSlice = createSlice({
  name: "billsPayment",
  initialState,
  reducers: {
    setTVPackages: (state, action) => {
      state.tv = action.payload;
    },
    setDataPackages: (state, action) => {
      state.data = action.payload;
    },
    setElectricityPackages: (state, action) => {
      state.electricity = action.payload;
    },
  },
});

export const { setTVPackages, setDataPackages, setElectricityPackages } =
  billsSlice.actions;

export default billsSlice.reducer;

export const selectTVPackages = (state: RootState) => state.billsPayment.tv;
export const selectDataPackages = (state: RootState) => state.billsPayment.data;
export const selectElectricityPackages = (state: RootState) =>
  state.billsPayment.electricity;
