import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import fs from "fs";

dotenv.config();

const validateProfileUpdate = async (req, res, next) => {
  const password = req.body.password;
  const userid = req.headers.userid;

  const userPresent = await User.findById(userid);

  //!Validate the password
  if (userPresent) {
    const isPasswordValid = await bcrypt.compare(
      password,
      userPresent.password
    );
    if (!isPasswordValid) {
      const path = `./profiles/${req.file.filename}`;
      fs.unlink(path, (err) => {
        if (err) {
          return res.status(500).json({ message: "Unable to remove image" });
        }
      });
      return res.status(401).json({ message: "wrongpassword" });
    } else {
      next();
    }
  } else {
    const path = `./profiles/${req.file.filename}`;
    fs.unlink(path, (err) => {
      if (err) {
        return res.status(500).json({ message: "Unable to remove image" });
      }
    });
    return res.status(404).json({ message: "usernotfound" });
  }
};

export default validateProfileUpdate;
