import { formatAmount } from "../../utils";

interface AirtimeTopup {
  name: string;
  phone: string;
  transactionDate: string;
  amount: number;
}

interface AirtimeTopupProps {
  airtimeTopup: AirtimeTopup[];
}

const AirtimeTopupHistory = ({ airtimeTopup }: AirtimeTopupProps) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Service Name</th>
            <th>Phone Number</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {airtimeTopup?.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No airtime history available.
              </td>
            </tr>
          ) : (
            airtimeTopup?.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.name}</td>
                <td>{transaction.phone}</td>
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
                <td>{formatAmount(transaction.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AirtimeTopupHistory;
