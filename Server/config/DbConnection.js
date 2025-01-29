import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGOOSE_URL) {
  console.log("Please provide MONGODB_URL in the .env file.");
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Successfuly Connected To DataBase.");
  } catch (error) {
    console.log("DataBase connection faild.", error);
    process.exit(1);
  }
};

export default connectDB;
