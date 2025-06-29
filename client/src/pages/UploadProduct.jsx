import React,{useState} from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";


const UploadProduct = () => {

  const [data,setData] = useState({
      name : "",
      image : [],
      category : [],
      subCategory : [],
      unit : "",
      stock : "",
      price : "",
      discount : "",
      description : "",
      more_details : {},
  })

  const handleChange = (e)=>{
    const { name, value} = e.target 

    setData((preve)=>{
      return{
          ...preve,
          [name]  : value
      }
    })
  }

  return (
    <section>
        <div className='p-2  bg-white shadow-md flex items-center justify-between '>
            <h2 className='font-semibold'> Upload Product </h2>
        </div>
        <div className='grid gap-3'>
          <form className='grid gap-4'>
            <div className='grid gap-1'>
                  <label htmlFor='name' className='font-medium'>Name</label>
                  <input 
                    id='name'
                    type='text'
                    placeholder='Enter product name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
            </div>

             <div className='grid gap-1'>
                  <label htmlFor='description' className='font-medium'>Description</label>
                  <textarea 
                    id='description'
                    type='text'
                    placeholder='Enter product description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    required
                    multiple 
                    rows={3}
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                  />
                </div>

              <div>
                <p>Image</p>
                <div>
                    <div className='bg-blue-50 h-24 border rounded flex justify-center items-center'>
                    <div className='text-center flex justify-center items-center flex-col'>
                      <FaCloudUploadAlt size={35}/>
                      <p>Upload Image</p>
                    </div>
                   </div>
                  {/**display uploaded images */}
                  <div>
                    
                  </div>
                </div>
              </div>
          </form>
        </div>
    </section>
  )
}

export default UploadProduct