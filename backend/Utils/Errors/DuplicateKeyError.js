const ErrorHandler = require("../../Middlewares/ErrorHandler");

module.exports = (err, req, res, next) => {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    const error = new ErrorHandler(message, 400);
    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};