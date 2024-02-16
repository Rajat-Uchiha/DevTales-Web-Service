import express from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import verifyToken from "../Middlewares/auth.js";
import getBlogs from "../Controllers/getBlogs.js";
import getBlogByUrl from "../Controllers/getBlogByUrl.js";
import deleteBlogById from "../Controllers/deleteBlogById.js";
import createBlogPost from "../Controllers/createBlogPost.js";
import getAllBlogsByUser from "../Controllers/getAllBlogsByUser.js";

const blog_router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "cover-images");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uid = nanoid();

    cb(null, `${uid}_${originalname}`);
  },
});

const upload = multer({
  storage,
});

//! CREATE BLOG
blog_router.post("/blogs/create", upload.single("file"), createBlogPost);

//!Get all Blogs
blog_router.get("/blogs", getBlogs);

//!Get the blog based on it's id
blog_router.get("/blogs/:urltitle", getBlogByUrl);

//!Delete the blog based on it's id
blog_router.delete("/blogs/:id", verifyToken, deleteBlogById);

//!GET ALL BLOGS OF A PARTICULAR USER
blog_router.get("/blogs/user/:userID", verifyToken, getAllBlogsByUser);

export default blog_router;
