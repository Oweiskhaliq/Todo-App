import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todo: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        Date: {
          type: Date,
          default: Date.now,
        },
        description: {
          type: String,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const userModel = new mongoose.model("users", usersSchema);
export default userModel;
