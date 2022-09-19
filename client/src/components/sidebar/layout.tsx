import { ReactNode } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { UserSettings } from "./userOption";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <nav className=" w-60 pt-10  bg-green-500 flex  justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white flex  justify-center items-center text-green-200">
              <FaRegLightbulb size={40} />
            </div>
            <p className="text-white font-semibold text-lg">The Idea Pool</p>
          </div>
          <UserSettings />
        </div>
      </nav>
      <main className="flex-1 container mx-auto h-full">{children}</main>
    </div>
  );
};
