import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getAllFlashCardsDecks = async () => {
  return await axios.get(
    `${API_URL}/flashCards/getAllDecks/${
      JSON.parse(localStorage.getItem("user")).id
    }`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
