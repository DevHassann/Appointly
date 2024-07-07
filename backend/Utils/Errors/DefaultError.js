const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "An unknown error occurred.";
    const error = new ErrorHandler(message, 500);
    next(error);
};