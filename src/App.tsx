import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BillsPayment from "./pages/billsPayment/BillsPayment";
import Home from "./pages/home/Home";
import Transfer from "./pages/transfer/Transfer";
import AirtimeTopUp from "./pages/airtimeTopUp/AirtimeTopUp";
import OnBoarding from "./pages/onBoarding/OnBoarding";
import History from "./pages/history/History";
import BillsPaymentDetails from "./pages/billsPaymentDetails/BillsPaymentDetails";
import { mockServer } from "./data";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Bounce, ToastContainer } from "react-toastify";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  // Call the server for mock data
  mockServer();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/sign-up" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/bills" element={<BillsPayment />} />
              <Route
                path="/bills/:service/:code"
                element={<BillsPaymentDetails />}
              />

              <Route path="/airtime" element={<AirtimeTopUp />} />
              <Route path="/onboarding" element={<OnBoarding />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </Provider>
    </>
  );
}

export default App;
