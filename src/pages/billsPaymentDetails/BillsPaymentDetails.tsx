import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import "./billsPaymentDetails.css";
import CablePayment from "../../components/cablePayment/CablePayment";
import DataPayment from "../../components/dataPayment/DataPayment";
import ElectricityPayment from "../../components/electricityPayment/ElectricityPayment";

const BillsPaymentDetails = () => {
  const { service, code } = useParams();

  return (
    <main className="bills-details">
      <BreadCrumb
        home
        lastPage="Bills Payment"
        lastPageLink="/bills"
        currentPage={code as string}
      />

      {service == "tv" && <CablePayment title={code as string} />}

      {service == "data" && <DataPayment title={code as string} />}

      {service == "electricity" && (
        <ElectricityPayment title={code as string} />
      )}
    </main>
  );
};

export default BillsPaymentDetails;
