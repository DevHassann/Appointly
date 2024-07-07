const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = `Your URL has expired. Please try again later!`;
    const error = new ErrorHandler(message, 400);
    next(error);
};