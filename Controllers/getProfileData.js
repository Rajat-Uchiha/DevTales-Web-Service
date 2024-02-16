import User from "../models/user.js";
const ObjectId = mongoose.Types.ObjectId;
import mongoose from "mongoose";

const getProfileData = async (req, res) => {
  const userid = req.params.id;
  //!Validation
  if (!ObjectId.isValid(userid)) {
    return res.status(400).json({ message: "invaliduserid" });
  } else {
    {
      try {
        const getUserId = async () => {
          const result = await User.findById(userid);
          res.json(result);
        };

        getUserId();
      } catch (error) {
        res.status(403).json({ message: "usernotfound" });
      }
    }
  }
};

export default getProfileData;
