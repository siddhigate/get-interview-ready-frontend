import React, { useState } from "react";
import { showToast } from "../../../utils/showToast";
import { updateSolutionUrl } from "../services/updateSolutionUrl";

const URLS = {
  codesandbox: {
    type: "codesandbox",
    domain: "https://codesandbox.io",
  },
  codepen: {
    type: "codepen",
    domain: "https://codepen.io",
  },
  gist: {
    type: "gist",
    domain: "https://gist.github.com",
  },
  repl: {
    type: "repl",
    domain: "https://replit.com",
  },
};

function validateUrl(url, type) {
  if (url.includes(URLS[type].domain)) {
    return true;
  } else {
    return false;
  }
}

const AddSolutionUrl = ({ type, setSolutionURL, id, closeModal }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  //   const navigate = useNavigate();

  async function saveEmbed({ solution_url }) {
    setLoading(true);
    try {
      const res = await updateSolutionUrl({ id, url: solution_url, type });

      if (res.data.success) {
        setSolutionURL({
          url: solution_url,
          type,
        });
        
        closeModal();
      } else {
        showToast("Something went wrong");
      }
      setLoading(false);
    } catch (err) {
      showToast(false, "Somehting went wrong!");
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
    console.log(data);

    if (!validateUrl(data.solution_url, type)) {
      setError(`Please enter a ${type} url`);
    } else {
      saveEmbed(data);
    }
    
  };

  return (
    <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="name" className="form-label">
          Enter {type} url:
        </label>
        <input
          id="name"
          type="url"
          className="form-control"
          placeholder="https://"
          name="solution_url"
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
          {loading && "Saving..."}
          {!loading && "Embed"}
        </button>
      </div>
    </form>
  );
};

export default AddSolutionUrl;
