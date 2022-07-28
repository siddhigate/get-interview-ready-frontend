import React from "react";

const SignupForm = () => {
  return (
    <div className="min-height-90 flex flex-justify-center flex-items-center">
      <main className="auth-form mt-xl container-center-sm">
        <h1 className="mb-xl fst-italic">Sign up</h1>

        <div className="form-control-wrapper">
          <label for="first-name" className="form-label">
            Enter full name
          </label>
          <input
            id="first-name"
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-control-wrapper">
          <label for="email" className="form-label">
            Enter email
          </label>
          <input
            id="username"
            type="email"
            className="form-control"
            placeholder="mail@domain.com"
          />
        </div>

        <div className="form-control-wrapper">
          <label for="password" className="form-label">
            Enter password
          </label>
          <div className="pos-relative">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="*********"
            />
            <i className="fas fa-eye-slash icon-eye"></i>
          </div>
        </div>

        <button className="btn btn-primary width-100"> Sign up </button>

        <a href="./signup.html" className="link">
          <p className="txt-gray txt-center mt-md">
            Already have an account?
            <span className="txt-primary width-100">Login</span>
          </p>
        </a>
      </main>
    </div>
  );
};

export default SignupForm;
