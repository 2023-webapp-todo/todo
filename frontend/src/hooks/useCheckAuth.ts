import userIdState from "@/stores/userId";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const useCheckAuth = (): boolean => {
  const location = useLocation();
  const [authState, setAuthState] = useState(false);

  const setUserId = useSetRecoilState(userIdState);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(JSON.parse(localStorage.getItem("user") || "").user_id + "");
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [location.pathname, setUserId]);
  return authState;
};

export default useCheckAuth;
