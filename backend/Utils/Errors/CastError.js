const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    const error = new ErrorHandler(message, 400);
    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
