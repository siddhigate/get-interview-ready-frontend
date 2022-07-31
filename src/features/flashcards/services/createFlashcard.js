import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createFlashCard = async ({ question, answer, deck_id }) => {
  console.log(question, answer, deck_id)
  return await axios.post(
    `${API_URL}/flashCards/createFlashCard`,
    {
      question,
      answer,
      deck_id,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
