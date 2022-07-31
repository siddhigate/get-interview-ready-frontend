import axios from "axios";
import { API_URL } from "../../../constants/api";

export const insertScore = async ({
  name,
  deck_id,
  num_of_questions,
  score,
}) => {
  return await axios.post(
    `${API_URL}/flashCards/insertTestScore`,
    {
      name,
      deck_id,
      num_of_questions,
      score,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
