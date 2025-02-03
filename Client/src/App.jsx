import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "reactjs-popup/dist/index.css";
import PopUpModel from "./components/PopUpModel";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route index element={<TodoList />} />
            <Route path="/add-todo" element={<AddTodo />} />
          </Route>
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
