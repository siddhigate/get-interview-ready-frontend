import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateSolution = async ({id, solution}) => {
  return await axios.patch(
    `${API_URL}/technicalQuestions/updateSolution`,
    {
      id,
      solution
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
