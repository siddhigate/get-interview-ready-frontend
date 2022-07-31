import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getOneProject = async (id) => {
  return await axios.get(`${API_URL}/projects/getProject/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
