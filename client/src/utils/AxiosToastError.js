import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  console.error("Axios Error:", error); 
  toast.dismiss()
  toast.error(error?.response?.data?.message || "Something went wrong");
};

export default AxiosToastError;
