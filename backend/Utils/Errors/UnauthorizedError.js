const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = "Unauthorized: " + err.message;
    const error = new ErrorHandler(message, 401);
    next(error);
};
