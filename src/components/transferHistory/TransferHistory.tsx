import { formatAmount } from "../../utils";

interface Transfer {
  bankName: string;
  accountNumber: string;
  transactionDate: string;
  narration: string;
  amount: number;
}

interface TransferHistoryProps {
  transferHistory: Transfer[];
}

const TransferHistory = ({ transferHistory }: TransferHistoryProps) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Transaction Date</th>
            <th>Narration</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transferHistory?.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No transfer history available.
              </td>
            </tr>
          ) : (
            transferHistory?.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.bankName}</td>
                <td>{transaction.accountNumber}</td>
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
                <td>{transaction.narration}</td>
                <td>{formatAmount(transaction.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransferHistory;
