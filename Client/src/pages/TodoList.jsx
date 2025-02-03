import { useEffect, useState } from "react";
import { deleteTodoApi, getTodoApi } from "../Api/apiSummary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import PopUpModel from "../components/PopUpModel";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodoApi();
        const data = response.data;
        setTodos(data.todo);
        toast.success(response.message);
        navigate("/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);
  // Delete Todo
  const deleteTodo = async (todo_id) => {
    try {
      const response = await deleteTodoApi(todo_id);
      console.log(response);
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      console.log("err", error);
      toast.error(error.notodo);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Todo List
        </h2>

        {/* Loading & Error States */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo._id} className="border-b border-gray-300">
                    <td className="p-3">{todo.title}</td>
                    <td className="p-3">{todo.description}</td>
                    <td className="p-3">{todo.date}</td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button
                        onClick={() => onUpdate(todo)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <PopUpModel deleteTodo={deleteTodo} todo_id={todo._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
