import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getOneTechnicalQuestion = async (id) => {
  return await axios.get(`${API_URL}/technicalQuestions/getTechnicalQuestion/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
