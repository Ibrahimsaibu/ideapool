import React from "react";
import { FaRegLightbulb, FaUser } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex">
      <nav className=" w-60 pt-10 h-screen bg-green-500 flex  justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white flex  justify-center items-center text-green-200">
              <FaRegLightbulb size={40} />
            </div>
            <p className="text-white font-semibold text-lg">The Idea Pool</p>
          </div>
          <div className="mt-8 pt-10 mx-10 border-t-2 border-white">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-white flex  justify-center items-center text-green-200">
                <FaUser size={40} />
              </div>
              <p className="text-white font-semibold text-lg">Ibrahim Saibu</p>
              <p className="text-black font-semibold text-lg">Log out</p>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-10 ">
        <div>hello world</div>
      </main>
    </div>
  );
};

export default HomePage;
