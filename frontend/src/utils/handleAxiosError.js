export const handleAxiosError = (error) => {
  if (error.response) {
    alert(error.response.data?.error || "Server error occurred");
  } else if (error.request) {
    alert("No response from server");
  } else {
    alert("Unexpected error: " + error.message);
  }
};

