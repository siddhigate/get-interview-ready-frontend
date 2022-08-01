import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createTechnicalQuestion = async ({ question, tech_stack }) => {
  const techStr = tech_stack.replaceAll(" ", ",");
  return await axios.post(
    `${API_URL}/technicalQuestions/createTechnicalQuestion`,
    {
      question,
      tech_stack: techStr,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
