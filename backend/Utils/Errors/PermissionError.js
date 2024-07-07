const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "Insufficient permissions: " + err.message;
    const error = new ErrorHandler(message, 403);
    next(error);
};
