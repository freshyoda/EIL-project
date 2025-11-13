import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-around gap-[40vw] bg-primary_main shadow-lg sticky top-0 z-50 h-[120px]">
      <img src="./src/assets/eil_logo_60_transformation.png" alt="" />
      <div className= "flex justify-between item-center gap-10 text-white">
        <a className="text-white hover:underline hover:text-black transition duration-500" href = "#start">HOME</a>
        <a className="text-white hover:underline hover:text-black transition duration-500" href = "#footer">CONTACT</a>
        <a className="text-white hover:underline hover:text-black transition duration-500" href = "#" onClick={handleSignInClick}>SIGN-IN</a>
      </div>
    </header>
  );
}