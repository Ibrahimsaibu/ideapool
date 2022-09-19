import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { CounterComponent } from "../counter/counterComponent";
import axiosInstance from "../../services/axios";

interface IIdeaTextProps {
  text: "";
}

type IdeaProps = {
  id: string;
  text: string;
  impact: number;
  ease: number;
  confidence: number;
};
// interface IIdeasProps {
//   ideas: IdeaProps[];
// }

const Ideas = () => {
  const [impactCounter, setImpactCounter] = useState(10);
  const [ideaText, setIdeaText] = useState<IIdeaTextProps>({
    text: "",
  });
  const [ideas, setIdeas] = useState<IdeaProps[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [showIdeaInput, setShowIdeaInput] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false);

  const getIdeas = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/ideas/getIdeas");
      if (res.status === 200) {
        setLoading(false);
        setIdeas(res.data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaText({
      ...ideaText,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getIdeas();
  }, []);
  return (
    <div className="md:mx-20 pt-10  mx-0 h-screen ">
      <div className="w-full   px-4  pb-10 flex justify-between items-center border-b border-gray-300">
        <h5 className="text-xl font-semibold">My Ideas</h5>
        <BsPlusCircleFill size={40} color="green" />
      </div>

      {/* <ul className="w-full px-4  list-disc list-outside mx-4  text-gray-400  ">
        <li>
          <div className="flex w-full gap-24 ">
            <input
              type="textArea"
              name="text"
              value={ideaText.text}
              onChange={handleChange}
              className=" flex-1 border-b-2 border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
            <div className="flex-1 flex h-full  gap-14">
              <CounterComponent
                title="Impact"
                decrease={() => null}
                increase={() => null}
                number={impactCounter}
              />
              <CounterComponent
                title="Ease"
                decrease={() => null}
                increase={() => null}
                number={10}
              />
              <CounterComponent
                title="Confidence"
                decrease={() => null}
                increase={() => null}
                number={10}
              />
              <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                <p className="text-sm font-semibold">Avg.</p>

                <div className="flex justify-center items-center    text-gray-800 ">
                  <span>10</span>
                </div>
              </div>
              <div className="flex items-end justify-between space-x-6">
                <MdOutlineCheck size={32} color="green" />
                <MdOutlineClose size={32} />
              </div>
            </div>
          </div>
        </li>
      </ul> */}

      {!ideas || ideas.length < 1 ? (
        <div className="flex justify-center h-4/5  items-center mt-4 ">
          <div className="flex items-center text-gray-300 flex-col ">
            <FaRegLightbulb size={52} />
            <p>Got Ideas?</p>
          </div>
        </div>
      ) : (
        <div className="mt-7 w-full flex flex-col space-y-7">
          <ul
            className="w-full px-4  list-disc list-outside mx-4  text-gray-400  "
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <li>
              <div className="flex w-full items-center gap-24 ">
                <div className="flex-1">
                  <p>3D idea pool</p>
                </div>
                <div className="flex-1 flex h-full  gap-16">
                  <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                    <p className="text-sm">Impact</p>

                    <div className="flex justify-center items-center    text-gray-800 ">
                      <span>10</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                    <p className="text-sm">Ease</p>

                    <div className="flex justify-center items-center    text-gray-800 ">
                      <span>10</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                    <p className="text-sm">Confidence</p>

                    <div className="flex justify-center items-center    text-gray-800 ">
                      <span>10</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                    <p className="text-sm">Avg.</p>

                    <div className="flex justify-center items-center    text-gray-800 ">
                      <span>10</span>
                    </div>
                  </div>
                  {show && (
                    <div className="flex items-end justify-between space-x-6">
                      <AiOutlineEdit size={24} color="green" />
                      <IoTrashOutline size={24} color="green" />
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ideas;
