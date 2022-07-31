import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateInfo = async ({id, info}) => {
    
  return await axios.patch(
    `${API_URL}/dreamCompanies/updateMdText`,
    {
      id: id,
      text: info
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
