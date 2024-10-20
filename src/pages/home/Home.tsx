import { GrTransaction } from "react-icons/gr";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { PiListPlus } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import HomeCard from "../../components/homeCard/HomeCard";
import "./home.css";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { authLogout } from "../../redux/reducers/authentication";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  // Decrypt data
  const decryptUserData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Parse the decrypted string back into an object
    const parsedData = JSON.parse(decryptedData);
    return parsedData;
  };

  useEffect(() => {
    const data = decryptUserData(user as string);
    setUsername(data?.username);
  }, []);

  return (
    <main className="home">
      <header>
        <h4>Welcome, {username}</h4>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="home-container">
        <h1>Mobile Wallet</h1>
        <div className="home-content">
          <HomeCard
            href="/transfer"
            title="Money Transfer"
            description="Easily send money to friends and family with your mobile wallet."
            Icon={GrTransaction}
          />
          <HomeCard
            href="/bills"
            title="Bills Payment"
            description="Quickly pay utility bills, TV subscriptions, and more."
            Icon={PiListPlus}
          />
          <HomeCard
            href="/airtime"
            title="Airtime Top-up"
            description="Instantly recharge your mobile phone with airtime credits."
            Icon={IoPhonePortraitOutline}
          />
          <HomeCard
            href="/history"
            title="Transaction History"
            description="View transaction history."
            Icon={GoHistory}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
