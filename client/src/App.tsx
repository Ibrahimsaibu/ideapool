import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Ideas from "./components/user/ideas";
import { Layout } from "./components/sidebar/layout";
// import Login from "./components/auth/login";

function App() {
  return (
    <Router>
      <Layout>
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
