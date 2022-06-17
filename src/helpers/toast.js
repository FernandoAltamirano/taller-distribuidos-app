import { toast } from "react-toastify";

export const renderToast = (type, message = "") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "error":
      toast.warn(message);
      break;
  }
};
