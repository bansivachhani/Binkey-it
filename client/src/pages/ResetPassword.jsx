import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const valideValue = Object.values(data).every(el => el);

  useEffect(() => {
    let resetData = location?.state;

    // ✅ Fallback to localStorage if state is missing
    if (!resetData) {
      const stored = localStorage.getItem("resetPasswordData");
      if (stored) {
        try {
          resetData = JSON.parse(stored);
        } catch {
          resetData = null;
        }
      }
    }

    // ❌ Redirect if still no valid info
    if (!resetData?.success || !resetData?.email) {
      navigate("/");
      return;
    }

    setData((prev) => ({
      ...prev,
      email: resetData.email
    }));
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("resetPasswordData");
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Enter Your New Password</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor='newPassword'>New Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='newPassword'
                name='newPassword'
                value={data.newPassword}
                onChange={handleChange}
                placeholder='Enter new password'
                className='w-full outline-none'
              />
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm password'
                className='w-full outline-none'
              />
              <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
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

export default ResetPassword;
