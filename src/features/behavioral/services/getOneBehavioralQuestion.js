import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getAllBehavioralQuestions = async (id) => {
  return await axios.get(`${API_URL}/getAllBehavioralQuestions/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
