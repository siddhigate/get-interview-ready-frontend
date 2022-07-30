import axios from "axios";
import { API_URL } from "../../../constants/api";

export const loginService = async ({email, password}) => {
  return await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};
