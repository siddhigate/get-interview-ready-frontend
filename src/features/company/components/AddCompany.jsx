import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../services/createCompany";

const AddCompany = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function addCompany(company) {
    setLoading(true);
    try {
      console.log(company);
      const res = await createCompany(company);

      if (res.data.success) {
        navigate(`/dreamCompany/${res.data.dreamCompany.id}`, { replace: true });
      } else {
        setError("Something went wrong.");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
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
    console.log(user);
    addCompany(user);
  };

  return (
    <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="name" className="form-label">
          Enter your dream company name ✨
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Dream Company Name"
          name="name"
          onChange={() => setError("")}
          required
        />
      </div>

      {error && (
        <p
          className="mt-md mb-md txt-red txt-center"
          style={{ fontSize: "0.9rem" }}
        >
          {error}
        </p>
      )}

      <div className="flex flex-center">
        <button
          className="save-btn width-100"
          style={{ width: "80%", marginTop: "1rem" }}
          disabled={loading}
        >
          Add Company
        </button>
      </div>
    </form>
  );
};

export default AddCompany;
