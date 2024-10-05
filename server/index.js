import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Question.js";
import answerRoutes from "./routes/Answers.js";
import { getLocalTime } from "./utils/functions.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const DEV_MODE = process.env.DEV_MODE === "true";
const PROJECT_CODE = process.env.PROJECT_CODE;
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

const corsOptions = {
  origin: DEV_MODE ? "http://localhost:3000" : "https://allenbenny.site",
};

app.use(cors(corsOptions));

app.get(`/${PROJECT_CODE}/api/test`, (_, res) => {
  res.send({
    status: "OK",
    timestamp: getLocalTime(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    message: "Test route successful",
  });
});

app.use(`/${PROJECT_CODE}/api/user`, userRoutes);
app.use(`/${PROJECT_CODE}/api/questions`, questionRoutes);
app.use(`/${PROJECT_CODE}/api/answer`, answerRoutes);

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
