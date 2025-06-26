import React from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  return (
    <div className=" w-full max-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 px-2">
      <button className="flex justify-center items-center h-full p-3 text-neutral-700">
        <IoSearch size={23} />
      </button>
      <div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Search "milk"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "bread"',
            1000,
            'Search "sugar"',
            1000,
            'Search "panner"',
            1000,
            'Search "chocolate"',
            1000,
            'Search "curd"',
            1000,
            'Search "rice"',
            1000,
            'Search "egg"',
            1000,
            'Search "chips"',
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;
