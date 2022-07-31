import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import MarkdownEditor from "../../components/MarkdownEditor";
import { PROJECT_QUESTIONS } from "../../features/project/data/projectQuestions";
import { getOneProject } from "../../features/project/services/getOneProject";
import { updateProject } from "../../features/project/services/updateProject";
import SidebarLayout from "../../layouts/SidebarLayout";
import { showToast } from "../../utils/showToast";

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState({ name: "Project", answer: "" });
  const [answer, setAnswer] = useState(PROJECT_QUESTIONS);
  const [loading, setLoading] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);

  const getProject = async () => {
    setFetchLoading(true);
    try {
      const res = await getOneProject(id);
      setProject(res.data.project);
      if (res.data.project.answers) {
        setAnswer(res.data.project.answers);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  async function saveAnswer() {
    setLoading(true);
    try {
      console.log(id, answer)
      const res = await updateProject({ id, answer });
      console.log(res.data);
      setLoading(false);
      showToast(true, "Answer updated successfully!");
    } catch (err) {
      showToast(false, "Answer updation failed");

      setLoading(false);
    }
  }

  if(fetchLoading) {
    return <SidebarLayout><Loader></Loader></SidebarLayout>
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
        <Link to="/projects">Projects</Link>/{project.name.replace(" ", "-")}
      </p>
      <h1 style={{ marginBottom: "1rem" }}>{project.name}</h1>
      <button
        className="save-btn mb-md"
        onClick={saveAnswer}
        disabled={loading}
      >
        {loading && "Saving"}
        {!loading && "Save"}
      </button>
      <MarkdownEditor
        view="both"
        onChange={({ text }) => setAnswer(text)}
        defaultValue={answer}
        value={answer}
      ></MarkdownEditor>
    </SidebarLayout>
  );
};

export default Project;
