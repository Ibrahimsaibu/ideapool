import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { IdeaProps } from "../user/ideas";

interface IIdeasProps {
  idea: IdeaProps;
  editClick?: () => void;
  deleteClick?: () => void;
}

export const IdeaComponent = ({
  idea,
  editClick,
  deleteClick,
}: IIdeasProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleMoveIn = () => {
    setIsHover(true);
  };
  const handleMoveOut = () => {
    setIsHover(false);
  };
  return (
    <div>
      <ul className="w-full px-4  list-disc list-outside mx-4  text-gray-400  ">
        <li onMouseEnter={handleMoveIn} onMouseLeave={handleMoveOut}>
          <div className=" flex w-full items-center gap-24">
            <div className="flex-1">
              <p>{idea.text}</p>
            </div>
            <div className="flex-1 flex h-full  gap-16">
              <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                <p className="text-sm">Impact</p>

                <div className="flex justify-center items-center    text-gray-800 ">
                  <span> {idea.impact}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                <p className="text-sm">Ease</p>

                <div className="flex justify-center items-center    text-gray-800 ">
                  <span>{idea.ease}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                <p className="text-sm">Confidence</p>

                <div className="flex justify-center items-center    text-gray-800 ">
                  <span>{idea.confidence}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                <p className="text-sm">Avg.</p>

                <div className="flex justify-center items-center  text-gray-800 ">
                  <span>{idea.average}</span>
                </div>
              </div>
              {isHover && (
                <div className="flex items-end justify-between space-x-6 ">
                  <button onClick={editClick}>
                    <AiOutlineEdit size={24} color="green" />
                  </button>

                  <button onClick={deleteClick}>
                    <IoTrashOutline size={24} color="green" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
