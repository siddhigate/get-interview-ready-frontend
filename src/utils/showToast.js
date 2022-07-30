import { toast } from "react-toastify";

export const showToast = (success, message) => {
  if (success) {
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  } else {
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  }
};
