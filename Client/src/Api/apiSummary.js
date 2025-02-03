import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000",
});
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
};
//register APi
export const registerApi = async (registerData) => {
  try {
    const response = await Api.post("/api/user/register", registerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//Login User
export const loginApi = async (loginData) => {
  try {
    const response = await Api.post("/api/user/login", loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//add todo item
export const addTotoApi = async (addTodoData) => {
  try {
    const response = await Api.post("api/user/add-todo", addTodoData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get todo List
export const getTodoApi = async () => {
  try {
    const response = await Api.get("/api/user/get-todo", config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// delete todo items
export const deleteTodoApi = async (id) => {
  try {
    const response = await Api.delete(`/api/user/todo/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
