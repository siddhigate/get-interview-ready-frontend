import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateBehavioralQuestion = async ({id, answer}) => {
  return await axios.patch(
    `${API_URL}/behavioralQuestions/updateAnswer`,
    {
      id,
      answer
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
