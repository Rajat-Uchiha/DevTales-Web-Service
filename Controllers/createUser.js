import bcrypt from "bcrypt";
import User from "../models/user.js";

const createUser = async (req, res) => {
  //!Check if user has already existed
  const { username, password } = req.body;

  const userPresent = await User.findOne({ username });
  if (userPresent) {
    return res.status(400).json({ message: "User already existed" });
  } else {
    const hashedPwsd = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPwsd });
    await newUser.save();

    res.status(200).json({ message: "Registered Successfully!" });
  }
};
export default createUser;
