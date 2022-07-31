import axios from "axios";
import { API_URL } from "../../../constants/api";

export const updateSolutionUrl = async ({id, url}) => {

  console.log(id, url)
  return await axios.patch(
    `${API_URL}/technicalQuestions/updateSolutionUrl`,
    {
      id,
      url
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
};
