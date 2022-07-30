import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("token"));

    if (token) return { user, token, isAuth: true };

    return { token: "", user: null, isAuth: false };
  });

  // console.log(auth)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider };
