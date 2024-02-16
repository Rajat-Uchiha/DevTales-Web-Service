import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    urltitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: "cover-images/cover.png",
    },
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//Creating Model from blogSchema
const Blog = mongoose.model("blog", blogSchema);
export default Blog;
