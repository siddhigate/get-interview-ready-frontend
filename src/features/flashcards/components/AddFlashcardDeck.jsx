import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlashCardsDeck } from "../services/createFlashcardsDeck";

const AddFlashcardDeck = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function addProject(project) {
    setLoading(true);
    try {
      console.log(project);
      const res = await createFlashCardsDeck(project);

      if (res.data.success) {
        navigate(`/flashcards/${res.data.deck.id}`, { replace: true });
      } else {
        setError("Something went wrong.");
      }

      setLoading(false);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
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
          Enter deck name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Flash card deck name"
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
          Add Deck
        </button>
      </div>
    </form>
  );
};

export default AddFlashcardDeck;
