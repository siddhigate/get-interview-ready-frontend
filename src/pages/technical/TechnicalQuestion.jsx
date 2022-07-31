import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneTechnicalQuestion } from "../../features/technical/services/getOneTechnicalQuestion";
import SidebarLayout from "../../layouts/SidebarLayout";

const TechnicalQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({question: ""});
  

  const getProject = async () => {
    try {
      const res = await getOneTechnicalQuestion(id);
      setQuestion(res.data.project);
      console.log(res.data.project)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

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
        <Link to="/projects">Projects</Link>/{question.question.replace(" ", "-")}
      </p>
      <h1 style={{ marginBottom: "1rem" }}>{question.question}</h1>
    </SidebarLayout>
  );
};

export default TechnicalQuestion;
