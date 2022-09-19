import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface ICounterProps {
  title: string;
  number: number;
  increase: () => void;
  decrease: () => void;
}

export const CounterComponent = ({
  title,
  number = 10,
  increase,
  decrease,
}: ICounterProps) => {
  return (
    <div className="flex flex-col items-center space-y-3 text-gray-500 justify-between">
      <p className="text-sm">{title}</p>

      <div className="flex justify-center w-12 items-center  shadow-inner shadow-gray-50 bg-gradient-to-t bg-gray-200 border-gray-600 border text-gray-800 rounded-sm">
        <span>{number}</span>
        <div className="flex flex-col text-sm">
          <button onClick={increase}>
            <MdArrowDropUp />
          </button>
          <button onClick={decrease}>
            <MdArrowDropDown />
          </button>
        </div>
      </div>
    </div>
  );
};
