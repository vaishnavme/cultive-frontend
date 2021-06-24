import { toast } from "react-toastify";

export const successNotification = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    style: {
      color: "#ffffff",
      backgroundColor: "#28a745",
    },
  });
};
export const successRemoveNotification = (message) => {
  return toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      color: "#ffffff",
      backgroundColor: "#007bff",
    },
  });
};

export const errorNotification = (message) => {
  return toast.warning(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      color: "#ffffff",
      backgroundColor: "#dc3545",
    },
  });
};