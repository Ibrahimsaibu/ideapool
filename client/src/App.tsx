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
import { Toaster } from "react-hot-toast";
// import { useEffect, useState } from "react";
// import axiosInstance from "./services/axios";
// import Login from "./components/auth/login";

function App() {
  return (
    <Router>
      <Layout>
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route path="/user/idea" element={<Ideas />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
