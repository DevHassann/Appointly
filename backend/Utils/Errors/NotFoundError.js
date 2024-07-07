const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "Resource not found";
    const error = new ErrorHandler(message, 404);
    next(error);
};