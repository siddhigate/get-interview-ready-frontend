import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import { BEHAVIORAL_QUESTIONS } from "../../features/behavioral/data/behavioralQuestions";
import { createBehavioralQuestion } from "../../features/behavioral/services/createBehavioralQuestion";
import SidebarLayout from "../../layouts/SidebarLayout";

const BehavioralQuestionCreate = () => {
  const id = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({ question: "" });
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  function getQuestion() {
    const q = BEHAVIORAL_QUESTIONS.find(
      (question) => question.questionId === id.id
    );
    setQuestion(q);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  async function saveAnswer() {
    setLoading(true);
    setError("");
    try {
      const res = await createBehavioralQuestion({...question, answer});

      console.log(res.data);
      navigate(`/behavioral/${res.data.behavioralQuestion.id}`, { replace: true });
      setLoading(false);
    } catch (err) {
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
        <Link to="/behavioralquestions/all">Behavioral-Questions</Link>/Tell-me-about-yourself
      </p>
      <h1 style={{ marginBottom: "1rem" }}>{question.question}</h1>
      <button className="save-btn mb-md" onClick={saveAnswer} disabled={loading}>
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
