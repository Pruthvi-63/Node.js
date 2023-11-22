const { constants } = require("../constants/index.js");

exports.errorHandler = ({ err, req, res, next }) => {
  const statusCode = res.statusCode ?? 500;
  // res.json({ message: err.message });
  res.json(constants[statusCode]);
};
