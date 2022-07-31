import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import { insertScore } from "../services/insertScore";
import FlashCard from "./FlashCard";

const FlashCardsTest = ({ cards, id, name }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState([]);
  const [testCards, setTestCards] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);

  function startTest() {
    const shuffled = cards.sort(() => 0.5 - Math.random()).slice(0, 5);
    setTestCards(shuffled);

    setResults([...shuffled].map(() => false));
  }

  useEffect(() => {
    startTest();
  }, []);

  async function saveScore() {
    try {
      const res = await insertScore({
        deck_id: id,
        name,
        num_of_questions: testCards.length,
        score: results.filter((el) => el === true).length + 1,
      });
    } catch (err) {
      console.log(err)
    }
  }

  console.log(results);

  return (
    <div style={{ maxWidth: "650px", margin: "auto" }}>
      <h2 className="mb-md mt-md">Test</h2>
      {testCards && testCards.length > 0 && (
        <div
          className={
            flipped
              ? "flipped card card card-with-shadow question-card"
              : "card card card-with-shadow question-card"
          }
          onClick={() => setFlipped((prev) => !prev)}
        >
          <div className="flash-card">
            <div className="back">
              <span
                className="date mb-md"
                style={{ fontSize: "2rem", marginRight: "0.5rem" }}
              >
                {currIndex + 1}
              </span>
              <span className="date">Question:</span>
              <div className="question">
                <span className="dot bg-violet"></span>
                <p>{testCards[currIndex].question}</p>
              </div>
              <div className="date txt-center mb-md mt-xl">
                Tap to view answer{" "}
              </div>
            </div>

            <div className="front">
              <span
                className="date mb-md"
                style={{ fontSize: "2rem", marginRight: "0.5rem" }}
              >
                {currIndex + 1}
              </span>
              <span className="date">Answer:</span>
              <div className="question">
                <span className="dot bg-yellow"></span>
                <p>{testCards[currIndex].answer}</p>
              </div>
              <div className="date txt-center mb-md mt-xl">
                Tap to view question{" "}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex mt-md w-100 flex-center flex-gap-md">
        <button
          style={{ background: "none", border: "none" }}
          onClick={() =>
            setResults((prev) =>
              prev.map((el, index) => (index === currIndex ? true : el))
            )
          }
        >
          <i
            className="fa-solid fa-circle-check txt-green"
            style={{ fontSize: "3rem" }}
          ></i>
        </button>
        <button
          style={{ background: "none", border: "none" }}
          onClick={() =>
            setResults((prev) =>
              prev.map((el, index) => (index === currIndex ? false : el))
            )
          }
        >
          <i
            className="fa-solid fa-circle-xmark txt-red"
            style={{ fontSize: "3rem" }}
          ></i>
        </button>
      </div>
      <div className="d-flex mt-md w-100 flex-center flex-gap-md">
        {currIndex !== testCards.length - 1 && (
          <button
            style={{
              background: "var(--clr-primary)",
              border: "1px solid var(--clr-primary)",
              color: "white",
              fontSize: "0.9rem",
              padding: "0.75rem 3rem",
              borderRadius: "3px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            onClick={() => setCurrIndex((prev) => prev + 1)}
          >
            Next question
          </button>
        )}
        {currIndex === testCards.length - 1 && (
          <button
            style={{
              background: "var(--clr-violet)",
              border: "1px solid var(--clr-violet)",
              color: "white",
              fontSize: "0.9rem",
              padding: "0.75rem 3rem",
              borderRadius: "3px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            onClick={() => {setShowResultModal(true); saveScore();}}
          >
            Submit Test
          </button>
        )}
      </div>

      {showResultModal && (
        <Modal title="Your result" closeModal={() => setShowResultModal(false)}>
          <p className="txt-center fs-xl mb-xl mt-md">
            {results.filter((el) => el === true).length} /{testCards.length}
          </p>
          <div className="d-flex flex-center">
            <button
              className="btn save-btn mt-md"
              style={{ padding: "0.5rem 3rem" }}
              onClick={() => {
                setShowResultModal(false);
              }}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FlashCardsTest;
