import multer from "multer";
const handleErrors = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({ error: "File is too big " });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .send({ error: "Multiple files can't be uploaded " });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .send({ error: "Type of the file must be an image" });
    }
  }
};

export default handleErrors;
