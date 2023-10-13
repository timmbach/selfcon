import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then((conn) => {
  console.log(
    `Connected to MongoDB server ${conn.connection.host}`.cyan.underline.bold
  );
});

const app = express();

app.use(cors);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
