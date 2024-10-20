import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addBillsHistory } from "../../redux/reducers/transactionHistory";
import useWallet from "../../hooks/useWallet";
import { debitWallet } from "../../redux/reducers/wallet";

interface ElectricityPaymentProps {
  title: string;
}

const ElectricityPayment = ({ title }: ElectricityPaymentProps) => {
  const dispatch = useDispatch();
  const { walletBalance } = useWallet();

  const [formData, setFormData] = useState({
    cardNumber: "",
    amount: "",
  });
  const [formError, setFormError] = useState({
    cardNumber: "",
    amount: "",
  });

  const { cardNumber, amount } = formData;

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
      cardNumber: "",
      amount: "",
    };

    if (!cardNumber) {
      errors.cardNumber = "Card Number is required.";
      hasError = true;
    }

    if (!amount) {
      errors.amount = "Amount is required.";
      hasError = true;
    } else if (Number(amount) < 1) {
      errors.amount = "Invalid amount.";
      hasError = true;
    } else if (Number(amount) < 99) {
      errors.amount = "Must be 100 and above.";
      hasError = true;
    }
    setFormError(errors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Check if user has enough balance
    if (Number(formData.amount) > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }

    // Proceed with form submission
    toast.success(`Successful`);
    dispatch(
      addBillsHistory({
        price: parseFloat(formData?.amount),
        transactionDate: new Date().toLocaleString(),
        name: title,
        description: `${title} utility subscription`,
      })
    );
    dispatch(debitWallet(Number(formData?.amount)));

    // Clear form
    setFormData({
      cardNumber: "",
      amount: "",
    });
  };
  return (
    <div className="airtime-wrapper">
      <div className="page-header-container">
        <div className="page-header">
          <h1>{title} utility</h1>
        </div>
        <p>Pay and enjoy electricity.</p>
      </div>
      <div className="airtime-card">
        <div className="form-control">
          <label>Card Number</label>
          <input
            type="number"
            className=""
            placeholder="Enter number"
            name="cardNumber"
            value={cardNumber}
            onChange={handleInputChange}
          />
          {formError.cardNumber && (
            <p className="error-message">{formError.cardNumber}</p>
          )}
        </div>
        <div className="form-control">
          <label>Amount (N)</label>
          <input
            type="number"
            className=""
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={handleInputChange}
          />
          {formError.amount && (
            <p className="error-message">{formError.amount}</p>
          )}
        </div>

        <button className="button" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ElectricityPayment;
