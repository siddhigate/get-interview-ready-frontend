import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { logoutService } from "../services/logoutService";

const LogoutButton = () => {
  const { setAuth } = useAuth();

  async function logout() {
    try {
      await logoutService();
      localStorage.clear();
      setAuth({ token: "", user: "", isAuth: false });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li
      style={{ borderTop: "1px solid gray", paddingTop: "1rem" }}
      onClick={logout}
    >
      <img src="../assets/logout.png" alt=""></img>
      <span className="d-block">Logout</span>
    </li>
  );
};

export default LogoutButton;
