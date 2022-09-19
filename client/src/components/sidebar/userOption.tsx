import { useCallback, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

interface IUser {
  name: string;
  email: string;
}

export const UserSettings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("idealpool_token");
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/me");
      if (res.status === 200) {
        setLoading(false);
        setUser(res.data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem("idealpool_token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  if (loading || !user) return null;

  return (
    <div className="mt-8 pt-10 mx-10 border-t-2 border-white">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-white flex  justify-center items-center text-green-200">
          <FaUser size={40} />
        </div>
        <p className="text-white font-semibold text-lg">{user.name}</p>
        <button onClick={signOut} className="text-black font-semibold text-lg">
          Log out
        </button>
      </div>
    </div>
  );
};
