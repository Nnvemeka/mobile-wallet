import { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { fetchMockData } from "../../data";
import { GrTransaction } from "react-icons/gr";
import "./transfer.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTransferHistory } from "../../redux/reducers/transactionHistory";

interface BankList {
  name: string;
  code: string;
}

const Transfer = () => {
  const [bankList, setBankList] = useState<BankList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    bankCode: "",
    accountNumber: "",
    amount: "",
    narration: "",
  });
  const [formError, setFormError] = useState({
    bankCode: "",
    accountNumber: "",
    amount: "",
    narration: "",
  });
  const dispatch = useDispatch();

  const { bankCode, accountNumber, amount, narration } = formData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bankData = await fetchMockData("/api/transfer/bank-list");
        setBankList(bankData?.data?.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let hasError = false;
    const errors = {
      bankCode: "",
      accountNumber: "",
      amount: "",
      narration: "",
    };

    if (!bankCode) {
      errors.bankCode = "Bank is required.";
      hasError = true;
    }
    if (!accountNumber) {
      errors.accountNumber = "Account number is required.";
      hasError = true;
    } else if (accountNumber?.length < 10) {
      errors.accountNumber = "Account number not complete.";
      hasError = true;
    }
    if (!amount) {
      errors.amount = "Amount is required.";
      hasError = true;
    } else if (Number(amount) < 1) {
      errors.amount = "Invalid amount.";
      hasError = true;
    }
    setFormError(errors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    // Proceed with form submission
    toast.success("Bank transfer successful");
    dispatch(
      addTransferHistory({
        bankName: formData?.bankCode,
        accountNumber: formData?.accountNumber,
        transactionDate: new Date().toLocaleString(),
        narration: formData?.narration,
        amount: parseFloat(formData?.amount),
      })
    );

    // Clear form
    setFormData({
      bankCode: "",
      accountNumber: "",
      amount: "",
      narration: "",
    });
  };

  return (
    <main className="transfer">
      <BreadCrumb home currentPage="Transfer" />
      <div className="wrapper">
        <div className="page-header-container">
          <div className="page-header">
            <GrTransaction color="#e92a2a" size={"42px"} />
            <h1>Transfer</h1>
          </div>
          <p>
            Easily send money to friends and family with your mobile wallet.
          </p>
        </div>
        <div className="card">
          <div className="form-control">
            <label>Select Bank</label>
            {error ? (
              <p className="error-message">{error}</p>
            ) : loading ? (
              <p>Loading banks...</p>
            ) : (
              <>
                <select
                  name="bankCode"
                  value={bankCode}
                  onChange={handleInputChange}
                >
                  <option value="">Select bank</option>
                  {bankList?.map((item) => (
                    <option key={item?.code} value={item?.name}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {formError.bankCode && (
                  <p className="error-message">{formError.bankCode}</p>
                )}
              </>
            )}
          </div>

          <div className="form-control">
            <label>Account Number</label>
            <input
              type="number"
              name="accountNumber"
              value={accountNumber}
              onChange={handleInputChange}
              placeholder="Enter account number"
            />
            {formError.accountNumber && (
              <p className="error-message">{formError.accountNumber}</p>
            )}
          </div>

          <div className="form-control">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
            {formError.amount && (
              <p className="error-message">{formError.amount}</p>
            )}
          </div>

          <div className="form-control">
            <label>Narration</label>
            <input
              type="text"
              name="narration"
              value={narration}
              onChange={handleInputChange}
              placeholder="Enter narration"
            />
            {formError.narration && (
              <p className="error-message">{formError.narration}</p>
            )}
          </div>

          <button className="button" onClick={handleSubmit}>
            Proceed
          </button>
        </div>
      </div>
    </main>
  );
};

export default Transfer;
