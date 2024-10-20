import { IoPhonePortraitOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import "./airtimeTopUp.css";
import { fetchMockData } from "../../data";
import SkeletonLoader from "../../components/skeletonLoader/SkeletonLoader";
import { toast } from "react-toastify";
import { addAirtimeHistory } from "../../redux/reducers/transactionHistory";
import { useDispatch } from "react-redux";

interface NetworkProvider {
  name: string;
  code: string;
  src: string;
}

const AirtimeTopUp = () => {
  const [networkProviders, setNetworkProviders] = useState<NetworkProvider[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const regexPhone = /^[0][7-9][0-1][0-9]{4}[0-9]{4}$/g;

  const [formData, setFormData] = useState({
    phone: "",
    network: "",
    amount: "",
  });
  const [formError, setFormError] = useState({
    phone: "",
    network: "",
    amount: "",
  });

  const { phone, network, amount } = formData;

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

  const handleNetworkSelect = (networkCode: string) => {
    setFormData({
      ...formData,
      network: networkCode,
    });

    setFormError((prev) => ({
      ...prev,
      network: "",
    }));
  };

  const validateForm = () => {
    let hasError = false;
    const errors = {
      phone: "",
      network: "",
      amount: "",
    };

    if (!phone) {
      errors.phone = "Phone number is required.";
      hasError = true;
    } else if (!regexPhone.test(phone)) {
      errors.phone = "Must be a valid phone number.";
      hasError = true;
    }
    if (!network) {
      errors.network = "Select a network.";
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
    // Proceed with form submission
    toast.success("Airtime top up successful");
    dispatch(
      addAirtimeHistory({
        phone: formData?.phone,
        name: formData?.network,
        amount: parseFloat(formData?.amount),
        transactionDate: new Date().toLocaleString(),
      })
    );

    // Clear form
    setFormData({
      phone: "",
      network: "",
      amount: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const networkData = await fetchMockData("/api/airtime");

        setNetworkProviders(networkData?.data?.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="airtime">
      <BreadCrumb home currentPage="Airtime Top up" />

      <div className="airtime-wrapper">
        <div className="page-header-container">
          <div className="page-header">
            <IoPhonePortraitOutline color="#e92a2a" size={"42px"} />
            <h1>Airtime Topup</h1>
          </div>
          <p>Instantly recharge your mobile phone with airtime credits.</p>
        </div>
        <div className="airtime-card">
          <div className="form-control">
            <label>Enter mobile number</label>
            <input
              type="number"
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
            <label>Select Network</label>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <div className="airtime-network-list">
                {!loading
                  ? networkProviders.map((item) => {
                      return (
                        <div key={item?.name}>
                          <button
                            onClick={() => handleNetworkSelect(item?.name)}
                            className={
                              item?.name === network
                                ? "airtime-network-button airtime-network-button-border"
                                : "airtime-network-button"
                            }
                            type="button"
                          >
                            <img
                              src={item?.src}
                              alt=""
                              width={"50px"}
                              height={"50px"}
                            />
                          </button>
                        </div>
                      );
                    })
                  : Array(4)
                      .fill(null)
                      .map((_, index) => (
                        <SkeletonLoader
                          key={index}
                          height={"50px"}
                          width="50px"
                        />
                      ))}
              </div>
            )}
            {formError.network && (
              <p className="error-message">{formError.network}</p>
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
    </main>
  );
};

export default AirtimeTopUp;
