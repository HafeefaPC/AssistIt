// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center h-1/4 max-w-[1240px]  mx-auto p-5  text-white">
      <h1 className="w-full text-4xl font-bold text-[#00df9a]">hafeefa</h1>
      <ul className="flex gap-4 w-full">
        <li className="p-3 w-1/4  text-[#00df9a] text-center border border-[#00df9a] rounded-md">
          Home
        </li>
        <Link to="/Group">
        <li className="p-2 w-[8rem] text-[#00df9a] text-center border border-[#00df9a] rounded-md">
          I'm here to work
        </li>
        </Link>
        <Link to="/Uploader">
        <li className=" p-[.7rem] h-[4rem] w-[8rem] text-[#00df9a] text-center border border-[#00df9a] rounded-md">
          I need workers
        </li>
        </Link>
      </ul>
      <div className="flex gap-4">
        <Link to="/details">
          <button className="w-[5rem] bg-[#00df9a] rounded p-2">Details</button>
          </Link>
        <Link to="/signin">
          <button className="w-[5rem] bg-[#00df9a] rounded p-2">SignIn</button>
        </Link>
        <Link to="/signup">
          <button className="w-[5rem] bg-[#00df9a] rounded p-2">SignUp</button>
        </Link>
        


      </div>
    </div>
  );
};

export default Navbar;
