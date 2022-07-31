import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getOneFlashcardsDeck = async (id) => {
  return await axios.get(
    `${API_URL}/flashCards/getAllFlashCards?user_id=${
      JSON.parse(localStorage.getItem("user")).id
    }&deck_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
