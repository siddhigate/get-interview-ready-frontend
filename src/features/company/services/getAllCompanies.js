import axios from "axios";
import { API_URL } from "../../../constants/api";

export const getAllCompanies = async () => {
  return await axios.get(
    `${API_URL}/dreamCompanies/getAllDreamCompanies/${
      JSON.parse(localStorage.getItem("user")).id
    }`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
