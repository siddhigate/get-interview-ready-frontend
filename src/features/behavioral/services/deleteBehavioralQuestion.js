import axios from "axios";
import { API_URL } from "../../../constants/api";

export const deleteBehavioralQuestion = async (id) => {
  return await axios.post(
    `${API_URL}/behavioralQuestions/deleteBehavioralQuestion
    }`,
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
