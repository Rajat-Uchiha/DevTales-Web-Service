import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt";

dotenv.config();

const loginUser = async (req, res) => {
  const SRCT_SIGN = process.env.SRCT_SIGN;
  const { username, password } = req.body;

  const userPresent = await User.findOne({ username });

  if (!userPresent) {
    return res.status(400).json({ message: "User Not Found" });
  }
  //!Validate the password
  const isPasswordValid = await bcrypt.compare(password, userPresent.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Username or Password is wrong" });
  } else {
    //!Create Token for varification
    const token = jwt.sign({ id: userPresent._id }, SRCT_SIGN);
    res.status(200).json({ token, userID: userPresent._id, username });
  }
};

export default loginUser;
