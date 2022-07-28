import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { logoutService } from "../services/logoutService";

const LogoutButton = () => {
  const { setAuth } = useAuth();

  async function logout() {
    try {
      await logoutService();
      setAuth({ token: "", isAuth: false });
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={logout}>LogoutButton</button>;
};

export default LogoutButton;
