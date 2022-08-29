import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col space-y-8 w-1/2 items-center">
        <h4 className="text-4xl font-medium">Log In</h4>
        <div className="flex flex-col space-y-5 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <button className="px-8 bg-green-500 py-1 text-white">Log in</button>
          <p>
            Don't have an account?{" "}
            <Link to="/auth/signup">
              <span className="text-green-500">Create an account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
