import axios from "axios";
import { API_URL } from "../../../constants/api";

export const createRefferer = async ({ name, link, company_id }) => {
  return await axios.post(
    `${API_URL}/dreamCompanies/createReferrer`,
    {
      name,
      link,
      company_id,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
