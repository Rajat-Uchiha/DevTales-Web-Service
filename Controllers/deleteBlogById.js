import Blog from "../models/blog.js";
import User from "../models/user.js";
import fs from "fs";
const deleteBlogById = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.headers.userid;

  const deleteBlogById = async () => {
    const ownerUser = await User.findById(userId);
    const blogToBeDeletedId = await Blog.findById(blogId);
    const coverImagePath = blogToBeDeletedId.cover;
    await Blog.findByIdAndDelete(blogId);

    if (ownerUser) {
      ownerUser.userblogs.pull(blogId);

      fs.unlink(coverImagePath, (err) => {
        if (err) {
          res.status(500).json({ message: "deletionfailed" });
          return;
        }
      });
      await ownerUser.save();
      res.json({ route: "/" });
    } else {
      res.sendStatus(403);
    }
  };

  deleteBlogById();
};

export default deleteBlogById;
