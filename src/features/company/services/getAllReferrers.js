import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getAllReferrers = async (id) => {
  return await axios.get(
    `${API_URL}/dreamCompanies/getAllReferrers/?user_id=${
      JSON.parse(localStorage.getItem("user")).id
    }&company_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
