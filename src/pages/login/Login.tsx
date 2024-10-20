import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/authLayout/AuthLayout";
import "./login.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/reducers/authentication";
import { toast } from "react-toastify";
import { encryptData, findMatchingUser } from "../../crypto";

const Login = () => {
  const { registeredUsers } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      username: "",
      password: "",
    };

    if (!username) {
      errors.username = "Username is required.";
      hasError = true;
    }
    if (!password) {
      errors.password = "Password is required.";
      hasError = true;
    }
    setFormError(errors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const matchingUser = findMatchingUser(registeredUsers, formData);

    if (matchingUser) {
      if (!(matchingUser?.password === formData?.password)) {
        toast.error("Invalid credentials");
        return;
      }

      // Proceed with form submission
      toast.success("Login successful");

      // Encrypt login data before storing
      const encryptedData = encryptData({
        username: formData.username,
        password: formData.password,
      });

      dispatch(authenticateUser(encryptedData as string));

      // Clear form
      setFormData({
        username: "",
        password: "",
      });
      navigate("/home");
    } else {
      toast.error("User not found!");
      return;
    }
  };

  return (
    <AuthLayout>
      <div className="login">
        <div className="login-wrapper">
          <div className="login-header">
            <h2>Mobile Wallet</h2>
            <p>
              Experience seamless money transfers, instant airtime top-ups, and
              effortless bill payments all in one mobile wallet app!
            </p>
          </div>

          <div className="page-header-container">
            <div className="page-header">
              <h1>Login</h1>
            </div>
          </div>
          <div className="login-form">
            <div className="form-control">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
              />
              {formError.username && (
                <p className="error-message">{formError.username}</p>
              )}
            </div>

            <div className="form-control">
              <label>Password</label>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="show-hide-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formError.password && (
                <p className="error-message">{formError.password}</p>
              )}
            </div>

            <button className="button" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/auth/sign-up">
              <h4>Sign up</h4>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
