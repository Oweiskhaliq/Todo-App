import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/DbConnection.js";
import usersRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import passport from "passport";
import ConfigPassport from "./config/passportAuth.js";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
ConfigPassport(passport);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
app.use("/api/user", usersRouter);

//authentication using passport
app.get(
  "/api/user/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening  on address: http://localhost:${PORT}`);
  });
});
