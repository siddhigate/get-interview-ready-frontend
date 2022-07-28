import axios from "axios";
import { API_URL } from "../../../constants/api";

export const logoutService = async (email, password) => {
  return await axios.get(`https://e1bf3730-5e58-45bc-9a4c-114e48c47ea7.mock.pstmn.io/login`, {
    email,
    password,
  });
};
