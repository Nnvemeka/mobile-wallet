import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogout } from "../redux/reducers/authentication";

const useSessionTimeout = (timeout = 10 * 60 * 1000) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeoutRef = useRef<null | number>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/auth/login");
  };

  useEffect(() => {
    // Reset timeout on user activity
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    const handleActivity = () => resetTimeout();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Start initial timeout
    resetTimeout();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout]);

  return null;
};

export default useSessionTimeout;
