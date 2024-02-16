import multer from "multer";
import { nanoid } from "nanoid";

//! Where To store image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profiles");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uid = nanoid();

    cb(null, `${uid}_${originalname}`);
  },
});

//! Filter Images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000, files: 1 },
});

export default upload;
