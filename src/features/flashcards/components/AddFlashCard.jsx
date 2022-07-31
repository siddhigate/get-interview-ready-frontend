import { useState } from "react";
import { createFlashCard } from '../services/createFlashcard';

const AddFlashCard = ({id, closeModal}) => {

  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  async function addProject(project) {
    setLoading(true);
    try {
      const res = await createFlashCard({...project, deck_id: id});

      setLoading(false);
      closeModal();
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

    let obj = {};
    for (const [key, value] of formData) {
      obj[key] = value;
    }
    addProject(obj);
  };

  return (
    <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="name" className="form-label">
          Enter question
        </label>
        <textarea
          id="name"
          type="text"
          className="form-control"
          placeholder="Question"
          name="question"
          onChange={() => setError("")}
          required
        />
      </div>
      <div className="form-control-wrapper mt-md">
        <label htmlFor="answer" className="form-label">
          Enter answer
        </label>
        <textarea
          id="answer"
          type="text"
          className="form-control"
          placeholder="Answer"
          name="answer"
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
          Add Card
        </button>
      </div>
    </form>
  )
}

export default AddFlashCard