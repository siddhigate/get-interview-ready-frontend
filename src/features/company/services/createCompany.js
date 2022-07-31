import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createCompany = async ({ name }) => {
  return await axios.post(
    `${API_URL}/dreamCompanies/createDreamCompany`,
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
