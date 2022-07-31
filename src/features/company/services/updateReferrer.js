import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateReferrer = async ({ id, isContacted }) => {
  return await axios.patch(
    `${API_URL}/dreamCompanies/updateReferrer`,
    {
      id,
      isContacted,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
