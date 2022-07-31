import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTechnicalQuestion } from "../services/createTechnicalQuestion";

const AddQuestion = () => {
  
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function addQuestion(question) {
    setLoading(true);
    try {
      console.log(question)
      const res = await createTechnicalQuestion(question);

      if (res.data.success) {
        navigate(`/technicalquestion/${res.data.technicalQuestion.id}`, { replace: true });
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

    let data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    addQuestion(data);
  };
  
  return (
    <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="name" className="form-label">
          Enter question
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Question name"
          name="question"
          onChange={() => setError("")}
          required
        />
      </div>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="techstack" className="form-label">
          Enter tech stack or category
        </label>
        <input
          id="techstack"
          type="text"
          className="form-control"
          placeholder="JS"
          name="tech_stack"
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
      <button className="save-btn width-100" style={{width: "80%", marginTop: "1rem"}} disabled={loading}>
        Add Question
      </button>
      </div>

      
    </form>
  );
};

export default AddQuestion;
