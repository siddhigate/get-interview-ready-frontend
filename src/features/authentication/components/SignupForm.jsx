import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signupService } from "../services/signupService";
import { useNavigate, useLocation, Link } from "react-router-dom";

const SignupForm = () => {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  async function signup(user) {
    setLoading(true);
    try {
      console.log(user)
      const res = await signupService(user);

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
      console.log(err)
      if (err?.response?.data?.message?.length > 0) {
        setError(err.response.data.message);
      } else if (err.code === "ERR_NETWORK") {
        setError("Something went wrong, please check your network.");
      } else {
        setError("Something went wrong.");
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
    console.log(user)
    signup(user);
  };

  useEffect(() => {
    console.log(auth.isAuth);
    if (auth.isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuth, navigate]);

  return (
    <div className="min-height-90 flex flex-justify-center flex-items-center">
      <main className="auth-form mt-xl container-center-sm">
        <h1 className="mb-xl fst-italic">Sign up</h1>

        <form onSubmit={submitHandler}>
          <div className="form-control-wrapper">
            <label htmlFor="first-name" className="form-label">
              Enter full name
            </label>
            <input
              id="first-name"
              type="text"
              className="form-control"
              placeholder="First name"
              name="full_name"
              onChange={() => setError("")}
              required
            />
          </div>

          <div className="form-control-wrapper">
            <label htmlFor="email" className="form-label">
              Enter email
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
                placeholder="*********"
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
            Sign up{" "}
          </button>
        </form>
        <Link to="/login">
          <p className="txt-gray txt-center mt-md">
            Already have an account?
            <span className="txt-primary width-100">Login</span>
          </p>
        </Link>
      </main>
    </div>
  );
};

export default SignupForm;
