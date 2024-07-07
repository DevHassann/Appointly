const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "Bad request: " + err.message;
    const error = new ErrorHandler(message, 400);
    next(error);
};
