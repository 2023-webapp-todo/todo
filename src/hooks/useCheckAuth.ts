import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCheckAuth = (): boolean => {
  const location = useLocation();
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [location.pathname]);
  return authState;
};

export default useCheckAuth;
