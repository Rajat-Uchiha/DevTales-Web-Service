import User from "../models/user.js";
import fs from "fs";
const updateProfilePic = async (req, res) => {
  const newProfilePicPath = `profiles/${req.file.filename}`;

  try {
    // Find the user to update
    const user = await User.findById(req.headers.userid);

    if (!user) {
      fs.unlink(newProfilePicPath, (err) => {
        if (err) {
          res.status(500).json({ message: "deletionfailed" });
          return;
        }
      });
      res.status(404).json({ message: "usernotfound" });
      return;
    }

    if (user.profile != "profiles/user.jpg") {
      fs.unlink(user.profile, (err) => {
        if (err) {
          res.status(500).json({ message: "deletionfailed" });
          return;
        }
      });
    }

    user.profile = newProfilePicPath;
    await user.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed" });
  }
};

export default updateProfilePic;
