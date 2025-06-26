import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-20 shadow-md bg-white sticky top-0 z-50 ">
      <div className="container mx-auto  flex items-center px-2 justify-between">
        {/* logo */}
        <div className="h-full">
          <Link className="h-full flex justify-center items-center">
            <img
              src={logo}
              width={170}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={120}
              height={60}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
        </div>

        {/* search */}
        <Search />

        {/* login and my cart */}
        <div>Login and my cart</div>
      </div>
    </header>
  );
};

export default Header;
