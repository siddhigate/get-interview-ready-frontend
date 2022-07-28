import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginService } from "../services/loginService";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const { auth, setAuth } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  async function login(user) {
    try {
      const res = await loginService(user);
      localStorage.setItem("token", res.data.token);
      setAuth({ token: res.data.token, isAuth: true });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let user = {};
    for (const [key, value] of formData) {
      user[key] = value;
    }

    login(user);
  };

  useEffect(() => {
    console.log(auth.isAuth)
    if(auth.isAuth) {
        navigate("/", { replace: true });
    }
  }, [auth.isAuth, navigate])

  return (
    <div className="min-height-90 flex flex-justify-center flex-items-center">
      <main className="auth-form container-center-sm">
        <h1 className="mb-xl fst-italic">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="form-control-wrapper">
            <label htmlFor="username" className="form-label">
              Enter your mail
            </label>
            <input
              id="username"
              type="email"
              className="form-control"
              placeholder="mail@domain.com"
              name="email"
            />
          </div>

          <div className="form-control-wrapper">
            <label htmlFor="password" className="form-label">
              Enter password
            </label>
            <div className="pos-relative">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="*******"
                name="password"
              />
              <i className="fas fa-eye-slash icon-eye"></i>
            </div>
          </div>

          <button className="btn btn-primary width-100"> Login </button>
        </form>
        <a href="./login.html" className="link">
          <p className="txt-gray txt-center mt-md">
            Don't have an account?
            <span className="txt-primary width-100">Sign up</span>
          </p>
        </a>
      </main>
    </div>
  );
};

export default LoginForm;