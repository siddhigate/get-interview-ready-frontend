import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getAllTechnicalQuestions = async () => {
  return await axios.get(
    `${API_URL}/technicalQuestions/getAllTechnicalQuestions/${
      JSON.parse(localStorage.getItem("user")).id
    }`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
