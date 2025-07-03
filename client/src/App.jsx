import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    //console.log("userData",userData.data)
    if (userData?.success && userData?.data) {
      dispatch(setUserDetails(userData.data));
    } else {
      console.log("User not logged in or error fetching user details.");
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
        // setCategoryData(responseData.data)
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <div className="sticky bottom-4 p-2">
        <div className="bg-green-600 p-2 rounded">
          <div>

          </div>
          <div>
            
          </div>

        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
