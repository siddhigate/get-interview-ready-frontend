import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createFlashCardsDeck = async ({ name }) => {
  return await axios.post(
    `${API_URL}/flashCards/createDeck`,
    {
      name,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
