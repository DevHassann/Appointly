const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "Internal server error";
    const error = new ErrorHandler(message, 500);
    next(error);
};
