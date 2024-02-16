import Blog from "../models/blog.js";
import User from "../models/user.js";

const createBlogPost = async (req, res) => {
  const { urltitle, title, snippet, content } = req.body;

  if (req.file) {
    const filePath = `cover-images/${req.file.filename}`;
    const userID = req.headers.userid;

    const newBlog = new Blog({
      urltitle,
      title,
      snippet,
      cover: filePath,
      body: content,
    });

    try {
      const result = await newBlog.save();
      const newBlogId = result._id;
      const blogOwner = await User.findById(userID);

      // //!Will push the blog id into the user's blog list
      blogOwner.userblogs.push(newBlogId);
      await blogOwner.save();

      res.status(200).json({ message: "Blog is saved in the DB" });
    } catch {
      (err) => {
        console.log(err);
        res.status(403).send("Something went wrong while saving blogs");
      };
    }
  } else {
    res.status(400).json({ error: "Please select a cover image" });
  }
};

export default createBlogPost;
