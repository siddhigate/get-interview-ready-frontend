import React from "react";
import LoginForm from "../../features/authentication/components/LoginForm";
import NavLayout from "../../layouts/NavLayout";

const Login = () => {
  return (
    <NavLayout>
      <LoginForm />
    </NavLayout>
  );
};

export default Login;
