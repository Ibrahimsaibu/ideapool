import { useEffect, useMemo, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { CounterComponent } from "../counter/counterComponent";
import axiosInstance from "../../services/axios";
import { IdeaComponent } from "../ideas/ideas";

interface IIdeaTextProps {
  text: "";
}

export type IdeaProps = {
  _id: string;
  text: string;
  impact: number;
  ease: number;
  confidence: number;
  average: number;
};
// interface IIdeasProps {
//   ideas: IdeaProps[];
// }

const Ideas = () => {
  const [impactCounter, setImpactCounter] = useState<number>(10);
  const [easeCounter, setEaseCounter] = useState<number>(10);
  const [confidenceCounter, setConfidenceCounter] = useState<number>(10);
  const [ideaText, setIdeaText] = useState<IIdeaTextProps>({
    text: "",
  });
  const [ideas, setIdeas] = useState<IdeaProps[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showIdeaInput, setShowIdeaInput] = useState<Boolean>(false);
  const [show, setShow] = useState<boolean>(false);

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

  const increaseImpactCounter = () => {
    if (impactCounter < 10) {
      setImpactCounter((count) => count + 1);
    }
  };

  const decreaseImpactCounter = () => {
    if (impactCounter > 0) {
      setImpactCounter((count) => count - 1);
    }
  };
  const increaseEaseCounter = () => {
    if (easeCounter < 10) {
      setEaseCounter((count) => count + 1);
    }
  };

  const decreaseEaseCounter = () => {
    if (easeCounter > 0) {
      setEaseCounter((count) => count - 1);
    }
  };

  const increaseConfidenceCounter = () => {
    if (confidenceCounter < 10) {
      setConfidenceCounter((count) => count + 1);
    }
  };

  const decreaseConfidenceCounter = () => {
    if (confidenceCounter > 0) {
      setConfidenceCounter((count) => count - 1);
    }
  };

  const average = useMemo(() => {
    return Math.round((impactCounter + easeCounter + confidenceCounter) / 3);
  }, [confidenceCounter, easeCounter, impactCounter]);

  const isEmpty = useMemo(() => {
    return (!ideas || ideas.length < 1) && showIdeaInput === false;
  }, [ideas, showIdeaInput]);

  const handleCreateIdea = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/ideas/createidea", {
        text: ideaText.text,
        impact: impactCounter,
        ease: easeCounter,
        confidence: confidenceCounter,
        average: average,
      });
      if (res.status === 201) {
        setLoading(false);
        getIdeas();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdeas();
  }, []);

  if (loading) return <div>Loading..</div>;
  return (
    <div className="md:mx-20 pt-10  mx-0 h-screen ">
      <div className="w-full   px-4  pb-10 flex justify-between items-center border-b border-gray-300">
        <h5 className="text-xl font-semibold">My Ideas</h5>
        <button onClick={() => setShowIdeaInput(true)}>
          <BsPlusCircleFill size={40} color="green" />
        </button>
      </div>
      {showIdeaInput && (
        <ul className="w-full px-4 my-6  list-disc list-outside mx-4  text-gray-400  ">
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
                  decrease={decreaseImpactCounter}
                  increase={increaseImpactCounter}
                  number={impactCounter}
                />
                <CounterComponent
                  title="Ease"
                  decrease={decreaseEaseCounter}
                  increase={increaseEaseCounter}
                  number={easeCounter}
                />
                <CounterComponent
                  title="Confidence"
                  decrease={decreaseConfidenceCounter}
                  increase={increaseConfidenceCounter}
                  number={confidenceCounter}
                />
                <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
                  <p className="text-sm font-semibold">Avg.</p>

                  <div className="flex justify-center items-center    text-gray-800 ">
                    <span>{average}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between space-x-6">
                  <button onClick={handleCreateIdea}>
                    <MdOutlineCheck size={32} color="green" />
                  </button>
                  <button>
                    <MdOutlineClose
                      size={32}
                      onClick={() => setShowIdeaInput(false)}
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      )}

      {isEmpty ? (
        <div className="flex justify-center h-4/5  items-center mt-4 ">
          <div className="flex items-center text-gray-300 flex-col ">
            <FaRegLightbulb size={52} />
            <p>Got Ideas?</p>
          </div>
        </div>
      ) : null}

      {ideas &&
        ideas.map((idea) => {
          return (
            <div className="mt-7 w-full flex flex-col space-y-7" key={idea._id}>
              <IdeaComponent
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                idea={idea}
                show={show}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Ideas;
