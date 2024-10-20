import { useDispatch } from "react-redux";
import useBills from "../../hooks/useBills";
import { useState } from "react";
import { toast } from "react-toastify";
import { addBillsHistory } from "../../redux/reducers/transactionHistory";

interface CablePaymentProps {
  title: string;
}

const CablePayment = ({ title }: CablePaymentProps) => {
  const { TVPackages } = useBills();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    packageName: "",
    cardNumber: "",
    amount: "",
  });
  const [formError, setFormError] = useState({
    packageName: "",
    cardNumber: "",
    amount: "",
  });

  const { packageName, cardNumber } = formData;

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

  const handlePackageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPackage = TVPackages.find(
      (item) => item.name === e.target.value
    );
    if (selectedPackage) {
      setFormData({
        ...formData,
        packageName: selectedPackage.name,
        amount: selectedPackage.price?.toString(),
      });
    }

    setFormError((prev) => ({
      ...prev,
      packageName: "",
      amount: "",
    }));
  };

  const validateForm = () => {
    let hasError = false;
    const errors = {
      packageName: "",
      cardNumber: "",
      amount: "",
    };

    if (!packageName) {
      errors.packageName = "Select package.";
      hasError = true;
    }

    if (!cardNumber) {
      errors.cardNumber = "Card Number is required.";
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
    toast.success(`${title} subscription successful`);
    dispatch(
      addBillsHistory({
        price: parseFloat(formData?.amount),
        transactionDate: new Date().toLocaleString(),
        name: formData?.packageName,
        description: `${title} subscription`,
      })
    );

    // Clear form
    setFormData({
      packageName: "",
      cardNumber: "",
      amount: "",
    });
  };

  return (
    <div className="airtime-wrapper">
      <div className="page-header-container">
        <div className="page-header">
          <h1>{title} Subscription</h1>
        </div>
        <p>Pay and enjoy amazing TV channels.</p>
      </div>
      <div className="airtime-card">
        <div className="form-control">
          <label>Select Package</label>
          <select
            name="packageName"
            value={packageName}
            onChange={handlePackageSelect}
          >
            <option value="">Select Package</option>
            {TVPackages?.map((item) => (
              <option key={item?.name} value={item?.name}>
                {item?.name}
              </option>
            ))}
          </select>
          {formError.packageName && (
            <p className="error-message">{formError.packageName}</p>
          )}
        </div>

        <div className="form-control">
          <label>Smart Card Number</label>
          <input
            type="number"
            placeholder="Enter card number"
            name="cardNumber"
            value={cardNumber}
            onChange={handleInputChange}
          />
          {formError.cardNumber && (
            <p className="error-message">{formError.cardNumber}</p>
          )}
        </div>

        <button className="button" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CablePayment;
