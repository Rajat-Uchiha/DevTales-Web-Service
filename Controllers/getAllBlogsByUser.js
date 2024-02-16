import Blog from "../models/blog.js";
import User from "../models/user.js";

const getAllBlogsByUser = async (req, res) => {
  const userId = req.params.userID;

  try {
    const requestedUser = await User.findById(userId);

    const userblogsIds = requestedUser.userblogs;

    const createdBlogs = await Blog.find({
      _id: { $in: userblogsIds },
    }).sort({ createdAt: -1 });
    res.json(createdBlogs);
  } catch (err) {
    console.log(
      "In the blog.js where i am trying to get all the blogs of a particular user",
      err
    );
  }
};

export default getAllBlogsByUser;
