import { GoHistory } from "react-icons/go";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import useTransactions from "../../hooks/useTransactions";
import "./history.css";
import { useState } from "react";
import TransferHistory from "../../components/transferHistory/TransferHistory";
import AirtimeTopupHistory from "../../components/airtimeTopupHistory/AirtimeTopupHistory";
import BillsHistory from "../../components/billsHistory/BillsHistory";

const History = () => {
  const { transferHistory, airtimeHistory, billsHistory } = useTransactions();
  const [activeTab, setActiveTab] = useState("Transfers");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <main className="transaction-history">
      <BreadCrumb home currentPage="Transaction History" />

      <div className="wrapper">
        <div className="page-header-container">
          <div className="page-header">
            <GoHistory color="#e92a2a" size={"42px"} />
            <h1>Transaction History</h1>
          </div>
        </div>
        <div className="history-tabs-container">
          <button
            className={`${activeTab === "Transfers" ? "active" : "tab"}`}
            onClick={() => handleTabClick("Transfers")}
          >
            Transfers
          </button>
          <button
            className={`${activeTab === "Bills Payment" ? "active" : "tab"}`}
            onClick={() => handleTabClick("Bills Payment")}
          >
            Bills Payment
          </button>
          <button
            className={` ${activeTab === "Airtime Top Up" ? "active" : "tab"}`}
            onClick={() => handleTabClick("Airtime Top Up")}
          >
            Airtime Top Up
          </button>
        </div>

        {activeTab === "Transfers" && (
          <TransferHistory transferHistory={transferHistory} />
        )}
        {activeTab === "Airtime Top Up" && (
          <AirtimeTopupHistory airtimeTopup={airtimeHistory} />
        )}
        {activeTab === "Bills Payment" && <BillsHistory bills={billsHistory} />}
      </div>
    </main>
  );
};

export default History;
