import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongo from "./db.js";

import auth from "./routes/auth.js";
import user from "./routes/user.js";
import quiz from "./routes/quiz.js";

const app = express();

const api_version = "api";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const Port = 3000;

connectToMongo();

app.use(`/${api_version}/auth`, auth);
app.use(`/${api_version}/user`, user);
app.use(`/${api_version}/quiz`, quiz);


app.listen(Port, () => {
  console.log("Server Started");
});

app.get("/", (req, res) => {
  res.send({
    app: "Stellar",
    api_version
  });
});
