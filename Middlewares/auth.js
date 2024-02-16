import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SRCT_SIGN = process.env.SRCT_SIGN;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, SRCT_SIGN, (err) => {
      if (err) {
        return res.status(401).json({ message: "User Not Found" });
      }

      next();
    });
  } else {
    return res.status(403).json({ message: "User Not Found" });
  }
};

export default verifyToken;
