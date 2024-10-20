import { useSelector } from "react-redux";
import { selectwalletBalance } from "../redux/reducers/wallet";

const useWallet = () => {
  const walletBalance = useSelector(selectwalletBalance);
  return {
    walletBalance,
  };
};

export default useWallet;
