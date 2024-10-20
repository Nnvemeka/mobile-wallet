import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/authLayout/AuthLayout";
import "./signup.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/reducers/authentication";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { registeredUsers } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPhone = /^[0][7-9][0-1][0-9]{4}[0-9]{4}$/g;
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{3,}$/;

  const { email, phone, username, password, confirmPassword } = formData;
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
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
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!email) {
      errors.email = "Email is required.";
      hasError = true;
    } else if (!regexEmail.test(email)) {
      errors.email = "Must be a valid email address.";
      hasError = true;
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
      hasError = true;
    } else if (!regexPhone.test(phone)) {
      errors.phone = "Must be a valid phone number.";
      hasError = true;
    }

    if (!username) {
      errors.username = "Username is required.";
      hasError = true;
    }
    if (!password) {
      errors.password = "Password is required.";
      hasError = true;
    } else if (!regexPassword.test(password)) {
      errors.password =
        "Password must have at least one uppercase letter, one number, and one special character.";
      hasError = true;
    } else if (password.length < 6) {
      errors.password = "Password must be upto 6 characters.";
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Password is required.";
      hasError = true;
    } else if (!(password === confirmPassword)) {
      errors.confirmPassword = "Password mismatch.";
      hasError = true;
    }
    setFormError(errors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Check if user already exists
    const userExists = registeredUsers.some((user) => {
      return user.phone === formData.phone || user.email === formData.email;
    });

    if (userExists) {
      toast.error("User already exists");
      return;
    }

    // Proceed with form submission
    toast.success("Sign up successful");
    dispatch(
      registerUser({
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
      })
    );

    // Clear form
    setFormData({
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/auth/login");
  };
  return (
    <AuthLayout>
      <div className="signup">
        <div className="signup-wrapper">
          <div className="signup-header">
            <h2>Mobile Wallet</h2>
            <p>
              Experience seamless money transfers, instant airtime top-ups, and
              effortless bill payments all in one mobile wallet app!
            </p>
          </div>

          <div className="page-header-container">
            <div className="page-header">
              <h1>Sign up</h1>
            </div>
          </div>
          <div className="signup-form">
            <div className="form-control">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
              {formError.email && (
                <p className="error-message">{formError.email}</p>
              )}
            </div>

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
              <label>Phone Number</label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
              {formError.phone && (
                <p className="error-message">{formError.phone}</p>
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

            <div className="form-control">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="show-hide-button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formError.confirmPassword && (
                <p className="error-message">{formError.confirmPassword}</p>
              )}
            </div>

            <button className="button" onClick={handleSubmit}>
              Sign up - it's free!
            </button>
          </div>
          <div className="signup-footer">
            <p>Have an account?</p>
            <Link to="/auth/login">
              <h4>Login</h4>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
