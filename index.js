import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blog_router from "./routes/blog.js";
import user_router from "./routes/user.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! 3rd Party middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/cover-images", express.static(__dirname + "/cover-images"));
app.use("/profiles", express.static(__dirname + "/profiles"));

//!Make connection with DB
const CONNECTION_STR = process.env.CONNECTION_STR;

const PORT = process.env.PORT || 3001;
try {
  const connectTODB = async () => {
    await mongoose.connect(CONNECTION_STR);

    app.listen(PORT, () => {
      console.log("Connection established to the database : SERVER STARTED");
    });
  };
  connectTODB();
} catch (err) {
  console.log("Unable to make connection with the database ", err);
}

//! Routes related to the user
app.use("/user", user_router);

//! Routes related to blogs
app.use(blog_router);

//IF USER MAKE ANY OTHER REQUEST
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/404.html"));
});
