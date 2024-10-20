import { useDispatch } from "react-redux";
import useBills from "../../hooks/useBills";
import { useState } from "react";
import { toast } from "react-toastify";
import { addBillsHistory } from "../../redux/reducers/transactionHistory";
import { debitWallet } from "../../redux/reducers/wallet";
import useWallet from "../../hooks/useWallet";

interface DataPaymentProps {
  title: string;
}

const DataPayment = ({ title }: DataPaymentProps) => {
  const { dataPackages } = useBills();
  const { walletBalance } = useWallet();

  const dispatch = useDispatch();
  const regexPhone = /^[0][7-9][0-1][0-9]{4}[0-9]{4}$/g;

  const [formData, setFormData] = useState({
    plan: "",
    phone: "",
    amount: "",
  });
  const [formError, setFormError] = useState({
    plan: "",
    phone: "",
    amount: "",
  });

  const { plan, phone } = formData;

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

  const handlePlanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPackage = dataPackages.find(
      (item) => item.name === e.target.value
    );
    if (selectedPackage) {
      setFormData({
        ...formData,
        plan: selectedPackage.name,
        amount: selectedPackage.price?.toString(),
      });
    }

    setFormError((prev) => ({
      ...prev,
      plan: "",
      amount: "",
    }));
  };

  const validateForm = () => {
    let hasError = false;
    const errors = {
      plan: "",
      phone: "",
      amount: "",
    };

    if (!plan) {
      errors.plan = "Select plan.";
      hasError = true;
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
      hasError = true;
    } else if (!regexPhone.test(phone)) {
      errors.phone = "Must be a valid phone number.";
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
    toast.success(`${title} data subscription successful`);
    dispatch(
      addBillsHistory({
        price: parseFloat(formData?.amount),
        transactionDate: new Date().toLocaleString(),
        name: formData?.plan,
        description: `${formData?.amount} data plan`,
      })
    );
    dispatch(debitWallet(Number(formData?.amount)));

    // Clear form
    setFormData({
      plan: "",
      phone: "",
      amount: "",
    });
  };

  return (
    <div className="airtime-wrapper">
      <div className="page-header-container">
        <div className="page-header">
          <h1>{title} Data Subscription</h1>
        </div>
        <p>Pay and enjoy internet data.</p>
      </div>
      <div className="airtime-card">
        <div className="form-control">
          <label>Select plan</label>
          <select name="plan" value={plan} onChange={handlePlanSelect}>
            <option value="">Select plan</option>
            {dataPackages?.map((item) => (
              <option
                key={item?.name}
                value={item.name}
              >{`${item?.name} - ${item.data}`}</option>
            ))}
          </select>
          {formError.plan && <p className="error-message">{formError.plan}</p>}
        </div>

        <div className="form-control">
          <label>Mobile Number</label>
          <input
            type="number"
            className=""
            placeholder="Enter phone number"
            name="phone"
            value={phone}
            onChange={handleInputChange}
          />
          {formError.phone && (
            <p className="error-message">{formError.phone}</p>
          )}
        </div>

        <div className="form-control">
          <label>Amount (N)</label>
          <input type="number" readOnly value={formData.amount} />
        </div>

        <button className="button" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default DataPayment;
