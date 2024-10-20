import { formatAmount } from "../../utils";

interface Bills {
  name: string;
  price: number;
  description: string;
  transactionDate: string;
}

interface BillsProps {
  bills: Bills[];
}

const BillsHistory = ({ bills }: BillsProps) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills?.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No bills history available.
              </td>
            </tr>
          ) : (
            bills?.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.name}</td>
                <td>{transaction.description}</td>
                <td>
                  {new Date(transaction.transactionDate).toLocaleString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </td>
                <td>{formatAmount(transaction.price)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillsHistory;
