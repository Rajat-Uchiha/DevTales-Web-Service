import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
      default: "profiles/user.jpg",
    },
    password: {
      type: String,
      required: true,
    },

    //Saved all the blogs which a particular user has submited
    userblogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
      },
    ],
  },
  { timestamps: true }
);

//Creating Model from blogSchema
const User = mongoose.model("user", userSchema);
export default User;
