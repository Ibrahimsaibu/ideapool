import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { formValidator } from "../../utility/validator";

interface ISignUpFormData {
  email: string;
  password: string;
  name: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState<ISignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<ISignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...formValues };

    const { formErrors, isValid } = formValidator(payload);
    if (isValid) {
      try {
        e.preventDefault();
        setLoading(true);
        const res = await axiosInstance.post("/user/signup", {
          ...payload,
        });
        if (res.status === 201) {
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setFormErrors(formErrors);
    }
  };

  console.log("formErrors", formErrors);
  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col space-y-8 w-1/2 items-center">
          <h4 className="text-4xl font-medium">Sign Up</h4>
          <div className="flex flex-col space-y-5 w-full">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
            {formErrors && (
              <span className="text-red-600">{formErrors.name}</span>
            )}
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
            {formErrors && (
              <span className="text-red-600">{formErrors.email}</span>
            )}
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="border-b border-grey-500 border-0 rounded-none py-3 px-0 focus:outline-none"
            />
            {formErrors && (
              <span className="text-red-600">{formErrors.password}</span>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <button className="px-8 bg-green-500 py-1 text-white">
              {loading ? "loading" : "Sign Up"}
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/">
                <span className="text-green-500">Log in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
