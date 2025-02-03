import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully.");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          To-Do App
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex gap-6 items-center ${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-blue-600 lg:bg-transparent lg:static lg:flex`}
        >
          <li className="py-2 px-4 lg:py-0">
            <Link to="/" className="hover:text-gray-300">
              Tod-List
            </Link>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <Link to="/add-todo" className="hover:text-gray-300">
              Add Todo
            </Link>
          </li>
          <li className="py-2 px-4 lg:py-0">
            {!token ? (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            ) : (
              <button onClick={() => Logout()} className="hover:text-gray-300">
                Logout
              </button>
            )}
          </li>
          <li className="py-2 px-4 lg:py-0">
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
