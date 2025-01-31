import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/DbConnection.js";
import usersRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
app.use("/api/user", usersRouter);

const PORT = process.env.PORT || 2999;

connectDB().then(() => {
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is listening  on address: https://0.0.0.0:${PORT}`);
  });
});
