import { ReactNode } from "react";
import "./authLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="layout">
      <div className="layout-container">
        <div className="layout-form-container">{children}</div>
        <div className="layout-content-container">
          <h1 className="layout-title">Mobile Wallet</h1>
          <p className="layout-description">
            Experience seamless money transfers, instant airtime top-ups, and
            effortless bill payments all in one mobile wallet app!
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
