import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getOneCompany = async (id) => {
  return await axios.get(`${API_URL}/dreamCompanies/getDreamCompany/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
