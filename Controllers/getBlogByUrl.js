import Blog from "../models/blog.js";

const getBlogByUrl = async (req, res) => {
  const urltitle = req.params.urltitle;

  // Validation
  if (urltitle === "") {
    return res.status(400).json({ message: "pass-valid-urltitle" });
  }

  try {
    // Use await here to wait for the asynchronous operation
    const result = await Blog.findOne({ urltitle });

    if (!result) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getBlogByUrl;
