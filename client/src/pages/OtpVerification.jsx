import React, { useEffect, useRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);

        // ✅ Store reset password info
        localStorage.setItem("resetPasswordData", JSON.stringify({
          email: location?.state?.email,
          success: true
        }));

        // Navigate without state
        navigate("/reset-password");
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-9">
        <p className="font-semibold text-lg">Enter OTP</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <label>Enter Your OTP:</label>
          <div className="flex items-center gap-2 justify-between mt-3">
            {data.map((val, index) => (
              <input
                key={index}
                type="text"
                ref={(ref) => (inputRef.current[index] = ref)}
                maxLength={1}
                className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                value={val}
                onChange={(e) => {
                  const value = e.target.value;
                  const newData = [...data];
                  newData[index] = value;
                  setData(newData);
                  if (value && index < 5) inputRef.current[index + 1].focus();
                }}
              />
            ))}
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-green-700 hover:text-green-800">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
