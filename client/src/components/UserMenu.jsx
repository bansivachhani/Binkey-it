import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import SummaryApi from "../common/SummaryApi";
import Axios from '../utils/Axios'
import { logout } from "../store/userSlice";
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleLogout = async() =>{
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })

      if(response.data.success)
      {
        dispatch(logout)
        localStorage.clear()
        toast.success(response.data.message)
      }

    }
    catch(error)
    {
      AxiosToastError(error)
    }

  }

  return (
    <div>
      <div className="font-semibold">My Account </div>
      <div className="text-sm">{user.name || user.mobile}</div>

      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={""} className="px-2 hover:bg-orange-300 py-1">
          Save Address
        </Link>
        <Link to={""} className="px-2 hover:bg-orange-300 py-1">
          My Orders
        </Link>
        <button onClick={handleLogout} className="text-left px-2 hover:bg-orange-300 py-1">Log Out</button>
      </div>
    </div>
  );
};

export default UserMenu;
