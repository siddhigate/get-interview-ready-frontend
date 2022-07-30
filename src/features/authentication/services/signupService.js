import axios from "axios";
import { API_URL } from "../../../constants/api";

export const signupService = async ({full_name, email, password}) => {
  return await axios.post(`${API_URL}/signup`, {
    full_name,
    email,
    password,
  });
};
