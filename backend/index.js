import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongo from "./db.js";

import auth from "./routes/auth.js";
import user from "./routes/user.js";
import quiz from "./routes/quiz.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const Port = 3000;

connectToMongo();

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/quiz", quiz);


app.listen(Port, () => {
  console.log("Server Started");
});
