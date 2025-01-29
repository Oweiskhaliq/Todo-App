import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";



export const test = (req, res) => {
  res.send({
    message: "Server is running...",
  });
};

// register user controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name || email || password) {
      return res.status(404).json({
        message: "All field are required name,email,password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "user Already register.",
        error: true,
        success: false,
      });
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
    return res.status(404).json(error);
  }
};
