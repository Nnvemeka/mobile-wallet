import { useSelector } from "react-redux";
import {
  selectDataPackages,
  selectElectricityPackages,
  selectTVPackages,
} from "../redux/reducers/billsPayment";

const useBills = () => {
  const TVPackages = useSelector(selectTVPackages);
  const dataPackages = useSelector(selectDataPackages);
  const electricityPackages = useSelector(selectElectricityPackages);
  return {
    TVPackages,
    dataPackages,
    electricityPackages,
  };
};

export default useBills;
