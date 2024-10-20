import { useNavigate } from "react-router-dom";
import "./billsPayment.css";
import { PiListPlus } from "react-icons/pi";
import { useEffect, useState } from "react";
import SkeletonLoader from "../../components/skeletonLoader/SkeletonLoader";
import BillsItem from "../../components/billsItem/BillsItem";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import {
  setDataPackages,
  setElectricityPackages,
  setTVPackages,
} from "../../redux/reducers/billsPayment";
import { fetchMockData } from "../../data";

interface TVProvider {
  service_type: string;
  name: string;
  src: string;
  packages: Array<{ name: string; price: number }>;
}

interface DataProvider {
  id: string;
  desco: string;
  src: string;
  packages: Array<{ name: string; price: number; data: string }>;
}

interface ElectricityProvider {
  id: string;
  desco: string;
  src: string;
  packages: Array<{ name: string; price: number; unit: string | number }>;
}

const BillsPayment = () => {
  const [tvProviders, setTVProviders] = useState<TVProvider[]>([]);
  const [dataProviders, setDataProviders] = useState<DataProvider[]>([]);
  const [electricityProviders, setElectricityProviders] = useState<
    ElectricityProvider[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tvData, dataData, electricityData] = await Promise.all([
          fetchMockData("/api/bills/TVProviders"),
          fetchMockData("/api/bills/dataProviders"),
          fetchMockData("/api/bills/electricityProviders"),
        ]);

        setTVProviders(tvData?.data?.response);
        setDataProviders(dataData?.data?.response);
        setElectricityProviders(electricityData?.data?.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTVClick = (provider: TVProvider) => {
    dispatch(setTVPackages(provider?.packages));
    navigate(`tv/${provider?.service_type}`);
  };

  const handleDataClick = (provider: DataProvider) => {
    dispatch(setDataPackages(provider?.packages));
    navigate(`data/${provider?.desco}`);
  };

  const handleElectricityClick = (provider: ElectricityProvider) => {
    dispatch(setElectricityPackages(provider?.packages));
    navigate(`electricity/${provider?.desco}`);
  };

  return (
    <main className="bills">
      <BreadCrumb home currentPage={"Bills Payment"} />
      <div className="bills-wrapper">
        <div className="page-header-container">
          <div className="page-header">
            <PiListPlus color="#e92a2a" size={"42px"} />
            <h1>Bills Payment</h1>
          </div>
          <p>Quickly pay utility bills, TV subscriptions, and more.</p>
        </div>
        <div className="bills-card">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="form-control">
                <label>CABLE TV</label>
                <div className="bills-item-container">
                  {!loading
                    ? tvProviders?.map((provider, index: number) => (
                        <BillsItem
                          key={index}
                          image={provider?.src}
                          onClick={() => handleTVClick(provider)}
                        />
                      ))
                    : Array(4)
                        .fill(null)
                        .map((_, index) => (
                          <SkeletonLoader key={index} height={"80px"} />
                        ))}
                </div>
              </div>
              <div className="form-control">
                <label>MOBILE DATA</label>
                <div className="bills-item-container">
                  {!loading
                    ? dataProviders?.map((provider, index: number) => (
                        <BillsItem
                          key={index}
                          image={provider.src}
                          onClick={() => handleDataClick(provider)}
                        />
                      ))
                    : Array(4)
                        .fill(null)
                        .map((_, index) => (
                          <SkeletonLoader key={index} height={"80px"} />
                        ))}
                </div>
              </div>
              <div className="form-control">
                <label>UTILITY</label>
                <div className="bills-item-container">
                  {!loading
                    ? electricityProviders?.map((provider, index: number) => (
                        <BillsItem
                          key={index}
                          image={provider.src}
                          onClick={() => handleElectricityClick(provider)}
                        />
                      ))
                    : Array(4)
                        .fill(null)
                        .map((_, index) => (
                          <SkeletonLoader key={index} height={"80px"} />
                        ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default BillsPayment;
