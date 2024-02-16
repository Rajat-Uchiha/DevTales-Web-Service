const validate = (req, res, next) => {
  const { username, password } = req.body;

  if (
    username.length < 5 ||
    password.length < 8 ||
    username.length === 0 ||
    password.length === 0
  ) {
    return res
      .status(403)
      .json({ message: "Username or Password is too short" });
  }

  next();
};

export default validate;
