import axios from "axios";
import { API_URL } from "../../../constants/api";

export const deleteTechnicalQuestion = async (id) => {
  return await axios.post(
    `${API_URL}/technicalQuestions/deleteTechnicalQuestion/`,
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
