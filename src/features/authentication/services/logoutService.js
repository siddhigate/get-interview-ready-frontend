import axios from "axios";
import { API_URL } from "../../../constants/api";

export const logoutService = async (email, password) => {
  return await axios.get(`${API_URL}/logout`);
};
