import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import { BEHAVIORAL_QUESTIONS } from "../../features/behavioral/data/behavioralQuestions";
import { createBehavioralQuestion } from "../../features/behavioral/services/createBehavioralQuestion";
import SidebarLayout from "../../layouts/SidebarLayout";

const BehavioralQuestionCreate = () => {
  const id = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({ question: "", questionId: "x" });
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  function getQuestion() {
    if (id.id !== "new") {
      const q = BEHAVIORAL_QUESTIONS.find(
        (question) => question.questionId === id.id
      );
      setQuestion(q);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  async function saveAnswer() {
    setLoading(true);
    console.log(question, answer);
    setError("");
    if (!answer) {
      setError("Please enter answer");
    } else {
      try {
        const res = await createBehavioralQuestion({ ...question, answer });
        console.log(res.data);
        navigate(`/behavioral/${res.data.behavioralQuestion.id}`, {
          replace: true,
        });
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
  }

  return (
    <SidebarLayout>
      <p
        style={{
          color: "gray",
          fontSize: "0.9rem",
          marginBottom: "2rem",
          fontStyle: "italic",
          textTransform: "lowercase",
        }}
      >
        <Link to="/behavioralquestions/all">Behavioral-Questions</Link>/
        {question?.question?.replaceAll(" ", "-")}
      </p>
      {id.id !== "new" && (
        <h1 style={{ marginBottom: "1rem" }}>{question?.question}</h1>
      )}
      {id.id === "new" && (
        <input
          type="text"
          placeholder="Enter Question here"
          style={{
            border: "none",
            borderBottom: "1px solid gray",
            fontSize: "2rem",
          }}
          className="d-block mb-md"
          onChange={(e) =>
            setQuestion((q) => ({ ...q, question: e.target.value }))
          }
        ></input>
      )}
      <button
        className="save-btn mb-md"
        onClick={saveAnswer}
        disabled={loading}
      >
        {loading && "Saving"}
        {!loading && "Save"}
      </button>
      {error && (
        <p
          className="mt-md mb-md txt-red txt-center"
          style={{ fontSize: "0.9rem" }}
        >
          {error}
        </p>
      )}

      <MarkdownEditor onChange={({ text }) => setAnswer(text)}></MarkdownEditor>
    </SidebarLayout>
  );
};

export default BehavioralQuestionCreate;
