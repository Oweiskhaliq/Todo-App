import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginApi } from "../Api/apiSummary";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await loginApi(loginData);
      const token = response.token;
      localStorage.setItem("token", token);
      setLoginData({
        email: "",
        password: "",
      });
      // Remove token after 1 hour
      setTimeout(() => {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login after expiration
      }, 3600000); // 1 hour = 3600000 ms

      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setFieldError(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              // value={email}
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none pr-10"
              // value={password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEye color="green" size={23} />
              ) : (
                <FaRegEyeSlash color="green" size={23} />
              )}
            </span>
            {fieldError.password && (
              <span className="text-red-700 text-sm">
                {fieldError.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
