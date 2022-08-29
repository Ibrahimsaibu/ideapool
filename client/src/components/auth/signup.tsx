import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col space-y-8 w-1/2 items-center">
        <h4 className="text-4xl font-medium">Sign Up</h4>
        <div className="flex flex-col space-y-5 w-full">
          <input
            type="text"
            placeholder="Name"
            className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Email"
            className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Password"
            className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <button className="px-8 bg-green-500 py-1 text-white">Sign Up</button>
          <p>
            Already have an account?{" "}
            <Link to="/auth/login">
              <span className="text-green-500">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
