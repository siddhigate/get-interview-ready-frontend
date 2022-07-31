import axios from "axios";
import { API_URL } from "../../../constants/api";

export const deleteFlashcardsDeck = async (id) => {
  return await axios.post(
    `${API_URL}/flashCards/deleteDeck`,
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
