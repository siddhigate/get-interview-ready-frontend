import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createProject = async ({ name, tagline, tech_stack }) => {
  return await axios.post(
    `${API_URL}/projects/createProject`,
    {
      name,
      tagline,
      tech_stack,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
