import React, { useState, useEffect } from 'react';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { IoSearchOutline } from "react-icons/io5";
import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';

const ProductAdmin = () => {

  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }

    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className='bg-blue-50 min-h-screen'>
      <div className='p-4 bg-white shadow flex flex-col md:flex-row items-center justify-between gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>🛒 Product Management</h2>
        <div className='relative w-full max-w-md'>
          <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={20} />
          <input
            type='text'
            placeholder='Search product here...'
            className='pl-10 pr-4 py-2 w-full border rounded-lg outline-none focus:ring-2 ring-primary-200 bg-blue-50 text-gray-700'
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className='p-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
          {
            productData.map((p, index) => (
              <ProductCardAdmin key={p._id || index} data={p} fetchProductData={fetchProductData} />
            ))
          }
        </div>
      </div>

      <div className='flex justify-center items-center gap-4 py-4'>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 rounded-md border text-sm font-medium border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          ⬅ Previous
        </button>

        <span className='font-semibold text-gray-600'>{page} / {totalPageCount}</span>

        <button
          onClick={handleNext}
          disabled={page === totalPageCount}
          className="px-4 py-2 rounded-md border text-sm font-medium border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </section>
  );
};

export default ProductAdmin;
