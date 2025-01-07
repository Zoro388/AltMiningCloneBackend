const errorHandler = (error, req, res, next) => {
  if (error.errors?.title) {
    return res.status(400).json({ message: error.errors.title.message });
  }
  if (error.errors?.description) {
    return res.status(400).json({ message: error.errors.description.message });
  }
  if (error.errors?.tags) {
    return res.status(400).json({ message: error.errors.tags.message });
  }
  if (error.errors?.username) {
    return res.status(400).json({ message: error.errors.username.message });
  }
  if (error.errors?.email) {
    return res.status(400).json({ message: error.errors.email.message });
  }
  if (error.errors?.password) {
    return res.status(400).json({ message: error.errors.password.message });
  }
  if (error?.code === 11000 && error?.keyValue.username) {
    return res.status(400).json({ message: "Username Already Exists" });
  }
  res.status(500).json({
    message: "Something Went Wrong",
  });
};

module.exports = errorHandler;
