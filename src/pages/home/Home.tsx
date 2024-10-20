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

const Home = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  return (
    <main className="home">
      <header>
        <h4>Welcome, {user?.username}</h4>
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
