import { useState } from "react";
import { registerApi } from "../Api/apiSummary";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import the eye icons

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try {
      const response = await registerApi(registerData);
      toast.success(response.message);
      setRegisterData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setFieldError(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              onChange={handleChange}
              required
            />
            {fieldError.name && (
              <span className="text-red-700 text-sm">{fieldError.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              onChange={handleChange}
              required
            />
            {fieldError.email && (
              <span className="text-red-700 text-sm">{fieldError.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Enter your password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-4/6 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? (
                <FaRegEye color={"green"} size={23} className="text-gray-600" /> // Open eye icon
              ) : (
                <FaRegEyeSlash
                  color={"green"}
                  size={23}
                  className="text-gray-600"
                /> // Closed eye icon
              )}
            </span>
            {fieldError.password && (
              <span className="text-red-700 text-sm">
                {fieldError.password}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Confirm your password"
              name="password2"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-4/6 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
            >
              {showConfirmPassword ? (
                <FaRegEye color={"green"} size={23} className="text-gray-600" /> // Open eye icon
              ) : (
                <FaRegEyeSlash
                  color={"green"}
                  size={23}
                  className="text-gray-600"
                /> // Closed eye icon
              )}
            </span>
            {fieldError.password2 && (
              <span className="text-red-700 text-sm">
                {fieldError.password2}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
