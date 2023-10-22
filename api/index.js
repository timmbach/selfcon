// import express from "express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = 5000;
mongoose.connect(process.env.MONGODB_URI).then((conn) => {
  console.log(
    `Connected to MongoDB server ${conn.connection.host}`.cyan.underline.bold
  );
});
const app = express();
// app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
// auth
app.use("/api/auth", authRouter);

// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log(`Server running on port ${PORT} 5000`);
});
