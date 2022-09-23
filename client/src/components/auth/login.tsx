import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

interface ILoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<boolean>(false);
  // const token = localStorage.getItem("idealpool_token");
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      if (res.status === 200) {
        setUser(true);
      }
    } catch (error) {}
  };

  const [formData, setFormData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axiosInstance.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        setLoading(false);
        const token = res?.data.data.token;
        if (token) {
          localStorage.setItem("idealpool_token", token);
          navigate("/user/idea");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    if (user) {
      navigate("/user/ideas");
    }
  }, [navigate, user]);

  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col space-y-8 w-1/2 items-center">
          <h4 className="text-4xl font-medium">Log In</h4>
          <div className="flex flex-col space-y-5 w-full">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <button className="px-8 bg-green-500 py-1 text-white">
              {loading ? "loading" : "Log in"}
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup">
                <span className="text-green-500">Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
