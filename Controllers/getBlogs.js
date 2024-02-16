import Blog from "../models/blog.js";

const getBlogs = async (req, res) => {
  const getAllBlogs = async () => {
    const data = await Blog.find().sort({ createdAt: -1 });

    res.send(data);
  };
  getAllBlogs();
};

export default getBlogs;
