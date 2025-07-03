import { createContext,useContext } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import { toast } from "react-hot-toast";


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

    const updateCartItem = async(id,qty)=>{
      try{
        const response = await Axios({
          ...SummaryApi.updateCartItemQty,
          data : {
            _id : id,
            qty : qty
          }
        })

        const {data: responseData} = response;
        if(responseData.success)
        {
        toast.success(responseData.message)
          fetchCartItem();
          //return responseData;
        }
      }
      catch(error)
      {
        AxiosToastError(error);
        return error
      }
    }

    // const deleteCartItem = async(id,qty)=>{

    // }

    useEffect(() => {
        fetchCartItem();
    }, []);



    return (
        <GlobalContext.Provider value={{fetchCartItem,
          updateCartItem,
          //deleteCartItem,

        }}> 
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;