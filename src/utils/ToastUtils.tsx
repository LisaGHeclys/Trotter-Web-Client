import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function handleError(error: any) {
  switch (error.code) {
    case 1:
      toast.error("Password don't match");
      break;
    case 2:
      toast.error("Copy Failed!");
      break;
    case 400:
      toast.error("Invalid username/password");
      break;
    case 404:
      toast.error("User not found");
      break;
    case 500:
      toast.error("Operation failed, please try again");
      break;
    default:
      toast.error("An error occurred");
  }
}

export default handleError;
