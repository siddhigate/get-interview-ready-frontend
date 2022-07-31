import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import MarkdownEditor from "../../components/MarkdownEditor";
import { getOneBehavioralQuestion } from "../../features/behavioral/services/getOneBehavioralQuestion";
import { updateBehavioralQuestion } from "../../features/behavioral/services/updateBehavioralQuestion";
import SidebarLayout from "../../layouts/SidebarLayout";
import { showToast } from "../../utils/showToast";

const BehavioralQuestion = () => {
  const id = useParams();

  const [question, setQuestion] = useState({
    question: "",
    questionId: "",
    answer: "",
  });
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const [fetchloading, setFetchLoading] = useState(false);

  async function getQuestion() {
    setFetchLoading(true);
    try {
      const res = await getOneBehavioralQuestion(id.id);
      console.log(res.data);
      setQuestion(res.data.behavioralQuestion);
      setAnswer(res.data.behavioralQuestion.answer);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  }
  
  useEffect(() => {
    getQuestion();
  }, []);

  async function saveAnswer() {
    setLoading(true);
    try {
      const res = await updateBehavioralQuestion({ ...question, answer });
      console.log(res.data);
      setLoading(false);
      showToast(true, "Answer updated successfully!");
    } catch (err) {
      showToast(false, "Answer updation failed");

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

        {
          fetchloading && <Loader></Loader>
        }
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
      <MarkdownEditor
        onChange={({ text }) => setAnswer(text)}
        defaultValue={question.answer}
        value={answer}
      ></MarkdownEditor>
    </SidebarLayout>
  );
};

export default BehavioralQuestion;
