import { useState } from "react";
import { addTotoApi } from "../Api/apiSummary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [fieldError, setFieldError] = useState(""); // Server-side error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTotoApi(todoData);
      toast.success(response.message);
      setTodoData({
        title: "",
        description: "",
        date: "",
      });
      navigate("/");
    } catch (err) {
      console.log(err); // Set error message
      setFieldError(err.errors);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Add Todo
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Task Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Task</label>
            <input
              type="text"
              placeholder="Enter your task"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              // value={task}
              name="title"
              onChange={handleChange}
              required
            />
            {fieldError.title && (
              <span className="text-red-700 text-sm">{fieldError.title}</span>
            )}
          </div>
          {/* desc Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Task Description
            </label>
            <input
              type="text"
              placeholder="Enter your task desc"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              // value={task}
              name="description"
              onChange={handleChange}
            />
          </div>
          {/* Task Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Task Date</label>
            <input
              type="date"
              placeholder="Enter date"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              // value={task}
              name="date"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
