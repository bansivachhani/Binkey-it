import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
//import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async() => {
    try {
      setLoading(true)
        const response = await Axios({
            ...SummaryApi.searchProduct,
            data : {
              search : searchText ,
              page : page,
            }
        })

        const { data : responseData } = response

        if(responseData.success){
            if(responseData.page == 1){
              setData(responseData.data)
            }else{
              setData((preve)=>{
                return[
                  ...preve,
                  ...responseData.data
                ]
              })
            }
            setTotalPage(responseData.totalPage)
            console.log(responseData)
        }
    } catch (error) {
        AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

    useEffect(()=>{
    fetchData()
  },[page,searchText])

  console.log("page",page)

  return (
    <section  className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Results: {data.length}  </p>
     
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>

      {/**loading data */}
      {
              loading && (
                loadingArrayCard.map((_,index)=>{
                  return(
                    <CardLoading key={"loadingsearchpage"+index}/>
                  )
                })
              )
      }
      </div>


       </div>
    </section>
  )
}

export default SearchPage