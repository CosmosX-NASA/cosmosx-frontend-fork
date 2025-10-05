import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-10">
        <img
          src="/logo_landing.png"
          alt="Logo"
          className="w-64 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex space-x-6">
          <button
            className="w-40 py-3 text-lg text-white border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#090a0f]"
            onClick={() => navigate("/member")}
          >
            Member
          </button>
          <button
            className="w-40 py-3 text-lg text-white border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#090a0f]"
            onClick={() => navigate("/home")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
