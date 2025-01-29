import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/DbConnection.js";
import usersRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";

const app = express();
console.log(process.env.MONGOOSE_URL)
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.get("/", usersRouter);
app.use("/api/user", usersRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening  on address: https://localhost: ", PORT);
  });
});
