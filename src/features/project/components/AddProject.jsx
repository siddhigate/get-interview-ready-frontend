import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/createProject";

const AddProject = () => {
  
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function addProject(project) {
    setLoading(true);
    try {
      console.log(project)
      const res = await createProject(project);

      if (res.data.success) {
        navigate(`/project/${res.data.project.id}`, { replace: true });
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
    addProject(user);
  };
  
  return (
    <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="name" className="form-label">
          Enter project name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Project name"
          name="name"
          onChange={() => setError("")}
          required
        />
      </div>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="description" className="form-label">
          Enter short description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          placeholder="This project does ...."
          name="tagline"
          onChange={() => setError("")}
          required
        />
      </div>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="techstack" className="form-label">
          Enter tech stack
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
        Add Project
      </button>
      </div>

      
    </form>
  );
};

export default AddProject;
