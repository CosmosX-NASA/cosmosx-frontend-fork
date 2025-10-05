import React from "react";
import { useNavigate } from "react-router-dom";

const members = [
  { name: "JEONGYOUN KWON", img: "/member01.png" },
  { name: "SEUNGJUN LEE", img: "/member02.png" },
  { name: "CHAERIN SONG", img: "/member03.png" },
  { name: "EUNHAK LEE", img: "/member04.png" },
  { name: "KWAKJAE WON", img: "/member05.png" },
  { name: "GEONWOO KIM", img: "/member06.png" },
];

const MembersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white">
        <div className="container mx-auto px-6 py-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-32 object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-4 cursor-pointer"
          >
            <div className="w-52 h-52 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover border-black border-2"
              />
            </div>
            <span className="text-gray-200 font-normal">{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
