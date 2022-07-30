import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import { getOneBehavioralQuestion } from "../../features/behavioral/services/getOneBehavioralQuestion";
import { updateBehavioralQuestion } from "../../features/behavioral/services/updateBehavioralQuestion";
import SidebarLayout from "../../layouts/SidebarLayout";

const BehavioralQuestion = () => {
  const id = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({
    question: "",
    questionId: "",
    answer: "",
  });
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  async function getQuestion() {
    try {
      const res = await getOneBehavioralQuestion(id.id);
      console.log(res.data);
      setQuestion(res.data.behavioralQuestion);
      setAnswer(res.data.behavioralQuestion.answer);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  async function saveAnswer() {
    setLoading(true);
    setError("");
    try {
      const res = await updateBehavioralQuestion({ ...question, answer });
      console.log(res.data);
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
        <Link to="/behavioralquestions/all">Behavioral-Questions</Link>/
        {question.question.replace(" ", "-")}
      </p>
      {<h1 style={{ marginBottom: "1rem" }}>{question.question}</h1>}
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

      <MarkdownEditor
        onChange={({ text }) => setAnswer(text)}
        defaultValue={question.answer}
        value={answer}
      ></MarkdownEditor>
    </SidebarLayout>
  );
};

export default BehavioralQuestion;
