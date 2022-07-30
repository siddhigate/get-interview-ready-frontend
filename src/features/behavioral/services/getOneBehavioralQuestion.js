import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getOneBehavioralQuestion = async (id) => {
  return await axios.get(`${API_URL}/behavioralQuestions/getBehavioralQuestion/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
