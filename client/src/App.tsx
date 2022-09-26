import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Ideas from "./components/user/ideas";
import { Layout } from "./components/sidebar/layout";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "./services/axios";
// import Login from "./components/auth/login";

function App() {
  const [user, setUser] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      if (res.status === 200) {
        setUser(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, [user]);
  return (
    <Router>
      <Layout>
        <div>
          <Toaster />
        </div>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
            </>
          )}
          {user && <Route path="/user/idea" element={<Ideas />} />}
          <Route
            path="*"
            element={<Navigate to={user ? "user/idea" : "/"} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
