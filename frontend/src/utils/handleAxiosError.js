import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleAxiosError = (error) => {
  if (error.response) {
    toast.error(error.response.data?.error || "Server error occurred");
  } else if (error.request) {
    toast.error("No response from server");
  } else {
    toast.error("Unexpected error: " + error.message);
  }
};

