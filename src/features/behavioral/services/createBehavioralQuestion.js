import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createBehavioralQuestion = async ({questionId, question, answer}) => {
  return await axios.post(
    `${API_URL}/behavioralQuestions/createBehavioralQuestion`,
    {
        questionId,
        question,
        answer,
        user_id: JSON.parse(localStorage.getItem("user")).id
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
