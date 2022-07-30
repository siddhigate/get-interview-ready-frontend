import React from "react";
import { useParams } from "react-router-dom";

const BehavioralQuestionCreate = () => {
  const id = useParams();
  
  return <div>BehavioralQuestionCreate {id.id}</div>;
};

export default BehavioralQuestionCreate;
