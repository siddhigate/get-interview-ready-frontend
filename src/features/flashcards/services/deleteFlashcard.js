import axios from "axios";
import { API_URL } from "../../../constants/api";

export const deleteFlashcard = async (id) => {
  return await axios.post(
    `${API_URL}/flashCards/deleteFlashCard`,
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
