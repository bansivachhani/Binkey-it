import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const UploadSubCategoryModel = () => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 z-50 bg-opacity-70 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded "
            />
          </div>
          <div>
            <p>Image</p>
            <div className="border h-36 w-36 bg-blue-50"></div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
