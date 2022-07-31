import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateProject = async ({id, answer}) => {
  return await axios.patch(
    `${API_URL}/projects/updateAnswers`,
    {
      id,
      answers: answer
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
