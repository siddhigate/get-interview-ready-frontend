import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginService } from "../services/loginService";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LoginForm = () => {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  async function login(user) {
    setLoading(true);
    setError("");
    try {
      const res = await loginService(user);
      console.log(res.data);

      if (res.data.success) {
        const { user, token } = res.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        setAuth({ user, token, isAuth: true });
        navigate(from, { replace: true });
      } else {
        setError("Something went wrong.");
      }

      setLoading(false);
    } catch (err) {
      if(err?.response?.data?.message?.length > 0) {
        setError(err.response.data.message);
      }
      else if(err.code === "ERR_NETWORK") {
        setError("Something went wrong, please check your network.")
      } else {
        setError("Something went wrong.")
      }
      setLoading(false);
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

    // fetch("https://get-interview-ready-backend.herokuapp.com").then(() => console.log("done"));
  };

  useEffect(() => {
    console.log(auth.isAuth);
    if (auth.isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuth, navigate]);

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
              onChange={() => setError("")}
              required
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
                onChange={() => setError("")}
                required
              />
              <i className="fas fa-eye-slash icon-eye"></i>
            </div>
          </div>
          <div
            className="mt-md mb-md txt-red txt-center"
            style={{ fontSize: "0.9rem" }}
          >
            {error && <p>{error}</p>}
          </div>
          <button className="btn btn-primary width-100" disabled={loading}>
            {" "}
            Login{" "}
          </button>
        </form>

        <Link to="/signup">
          <p className="txt-gray txt-center mt-md">
            Don't have an account?
            <span className="txt-primary width-100">Sign up</span>
          </p>
        </Link>
      </main>
    </div>
  );
};

export default LoginForm;
