import { useSelector } from "react-redux";
import {
  selectAirtimeHistory,
  selectBillsHistory,
  selectTransferHistory,
} from "../redux/reducers/transactionHistory";

const useTransactions = () => {
  const airtimeHistory = useSelector(selectAirtimeHistory);
  const billsHistory = useSelector(selectBillsHistory);
  const transferHistory = useSelector(selectTransferHistory);
  return {
    airtimeHistory,
    billsHistory,
    transferHistory,
  };
};

export default useTransactions;
