import axios from "axios";
import { API_URL } from "../../../constants/api";

export const deleteProject = async (id) => {
  return await axios.post(
    `${API_URL}/projects/deleteProject`,
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
