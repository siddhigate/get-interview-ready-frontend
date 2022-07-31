import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateReferralMsg = async ({ id, referralMsg }) => {
  return await axios.patch(
    `${API_URL}/dreamCompanies/updateReferralMsg`,
    {
      id,
      msg: referralMsg,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
