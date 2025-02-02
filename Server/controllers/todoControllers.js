import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import validateRegisterInput from "../Validator/register.js";
import jwt from "jsonwebtoken";
import validateLoginInput from "../Validator/login.js";
import validateAddTodoInput from "../Validator/todo.js";

//Routes:  Post  /api/user/register
// Desc:  register new user
// Access: public
export const registerController = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // validate
  if (!isValid) {
    return res.status(404).json(errors);
  }
  try {
    // input validation

    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      errors.email = "User already register. please Login";
      return res.status(400).json(errors);
    }
    // incrypt the password
    const slat = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, slat);
    //create users
    const userFields = {
      name: name,
      email: email,
      password: hashPassword,
    };

    const newUser = new userModel(userFields);
    const save = await newUser.save();

    return res.json({
      message: "user created successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Routes:  Post  /api/user/login
// Desc:  login   user
// Access: public
export const loginController = async (req, res) => {
  //validation of login input
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    // destructring the field
    const { email, password } = req.body;

    // finding user in db exist or not
    const user = await userModel.findOne({ email });

    if (!user) {
      // if user not exist
      errors.email = "User not Register.";
      return res.status(404).json(errors);
    }

    // checking the password in db
    const muchedPassword = await bcryptjs.compare(password, user.password);

    if (!muchedPassword) {
      errors.password = "Incurrect password.";
      return res.status(400).json(errors);
    }
    //payload
    const payload = { id: user._id.toString(), name: user.name };

    // sending signing jwt token to user
    const jwtToken = await jwt.sign(payload, process.env.JWTTOKEN_KEY, {
      expiresIn: "1hr",
    });

    //sending response
    return res.json({
      token: "Bearer " + jwtToken,
      error: false,
      success: true,
    });
  } catch (error) {
    //if error
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//Routes:  Post  /api/user/get-todo
// Desc:  Get todo List
// Access: private
const getTodoListController = async (req, res) => {};
//Routes:  Post  /api/user/add-todo
// Desc:  Add todo items
// Access: private
export const AddTodoContorller = async (req, res) => {
  try {
    // Validation
    const { errors, isValid } = validateAddTodoInput(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const { title, date, description, completed } = req.body;

    // Find user
    const findUser = await userModel.findById(req.user.id);
    if (!findUser) {
      return res.status(404).json({ errors });
    }

    // Add new todo to user's todo array
    findUser.todo.unshift({ title, date, description, completed });

    // Save the updated user document
    await findUser.save();

    return res.json(findUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
