import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/DbConnection.js";
import usersRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import passport from "passport"
import ConfigPassport from "./config/passportAuth.js"

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
app.get('/api/user/current', passport.authenticate('jwt',{session: false}), (req,res)=>{
  return res.json({success: true})
})

const PORT = process.env.PORT || 2999;

connectDB().then(() => {
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is listening  on address: https://0.0.0.0:${PORT}`);
  });
});
