const notFound = (req, res) => {
  res.json({
    message: "Route not Found",
  });
};

module.exports = notFound;
