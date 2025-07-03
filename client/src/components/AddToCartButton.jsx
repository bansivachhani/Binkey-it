import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useState } from 'react'
import Loading from './Loading'

const AddToCartButton = ({data}) => {
    const {fetchCartItem} = useGlobalContext()
    const [loading, setLoading] = useState (false)

  const handleADDToCart = async (e) => {
      e.preventDefault()
      e.stopPropagation();

      try{
        setLoading(true)

        const response = await Axios({
          ...SummaryApi.addToCart,
          data: {
            productId: data?._id
          }
        })

        const {data:responseData} = response;

        if(responseData.success) {
          toast.success(responseData.message);
          if(fetchCartItem) {
            fetchCartItem();
          }
        }
      }
      catch(error) {
        AxiosToastError(error);
      }
      finally {
        setLoading(false)
      }
  }


  return (
    <div>
        <button onClick={handleADDToCart} className='bg-green-500 text-white rounded px-2 py-1  border hover:bg-green-700 text-sm text-center'>
           {loading ? <Loading/> : "Add"} 
        </button>

    </div>
  )
}

export default AddToCartButton