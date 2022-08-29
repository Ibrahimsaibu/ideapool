import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";

const Ideas = () => {
  const [showEmpty, setShowEmpty] = useState<Boolean>(false);
  return (
    <div className="md:mx-20 mx-0 h-screen ">
      <div className="w-full py-10 px-4 flex justify-between items-center border-b border-gray-300">
        <h5 className="text-xl font-semibold">My Ideas</h5>
        <BsPlusCircleFill size={40} color="green" />
      </div>
      <div className="h-full">
        {showEmpty ? (
          <div className="flex justify-center items-center mt-4 md:mt-40">
            <div className="flex items-center text-gray-300 flex-col ">
              <FaRegLightbulb size={52} />
              <p>Got Ideas?</p>
            </div>
          </div>
        ) : (
          <div className="mt-7 w-full">
            <ul className=" inline-flex w-full   text-gray-300  ">
              <li
                className="flex  w-full h-20 "
                style={{
                  listStyleType: "disc",
                }}
              >
                <p className="">1</p>
                <div>3</div>
              </li>
              <li className="w-full h-20 bg-black m-2">2</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;

<div className="flex">
  <div className="flex flex-1">
    <div className="list-item flex-initial w-64">
      <input
        type="text"
        placeholder="Enter Idea"
        className="border-b   border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
      />
      <div className="flex-1">
        <p>hello</p>
      </div>
    </div>
  </div>
</div>;
