import { createContext,useContext } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";


export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) =>{

    const dispatch = useDispatch()

    const fetchCartItem = async () => {
        try {
          const response = await Axios({
            ...SummaryApi.getCartItem,
          });
    
          const { data: responseData } = response;
          if (responseData.success) {
            //console.log("fetch cart item",responseData);
            dispatch(handleAddItemCart(responseData.data));
          }
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchCartItem();
    }, []);



    return (
        <GlobalContext.Provider value={{fetchCartItem}}> 
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;