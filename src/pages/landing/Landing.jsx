import React from "react";
import { Link } from "react-router-dom";
import NavLayout from "../../layouts/NavLayout";

const Landing = () => {
  return (
    <NavLayout>
      <div className="main-landing-container">
        <h1>Nail your tech interviews 🎯</h1>
        <p>
          Get interview ready will help you to prepare well for your technical
          interviews.
        </p>
        <Link to="/login"
        className="landing-login-link"
        >Get Started</Link>
        <img src="./assets/header.svg" alt="interview" />
      </div>

      

      <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--bs-gray)",
          borderTop: "1px solid #F1F5F9",
          background: "white"
        }}
        className="landing-footer"
      >
        <div className="flex flex-center">
          <img src="./assets/hashnode.png" alt="" />
          <div className="m-md">X</div>
          <img src="./assets/planetscale.jpg" alt="" />
        </div>
      </footer>
    </NavLayout>
  );
};

export default Landing;
