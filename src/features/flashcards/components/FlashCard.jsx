import React, { useState } from "react";
import Card from "../../../components/Card/Card";

const FlashCard = ({ date, question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
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
          <div className="date">Question: </div>
          <div className="question">
            <span className="dot bg-violet"></span>
            <p>{question}</p>
          </div>
        </div>

        <div className="front">
        <div className="date">Answer: </div>
          <div className="question">
            <span className="dot bg-yellow"></span>
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
