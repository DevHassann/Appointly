const CastError = require('./Errors/CastError');
const DuplicateKeyError = require('./Errors/DuplicateKeyError');
const JsonWebTokenError = require('./Errors/JsonWebTokenError');
const TokenExpiredError = require('./Errors/TokenExpiredError');
const ValidationError = require('./Errors/ValidationError');
const NotFoundError = require('./Errors/NotFoundError');
const UnauthorizedError = require('./Errors/UnauthorizedError');
const InternalServerError = require('./Errors/InternalServerError');
const BadRequestError = require('./Errors/BadRequestError');
const PermissionError = require('./Errors/PermissionError');
const DefaultError = require('./Errors/DefaultError');
const ErrorHandler = require('../Middlewares/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // Log the error for debugging
    console.error(err);

    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({ success: false, message: err.message });
    } else if (err.name === "CastError") {
        CastError(err, req, res, next);
    } else if (err.code === 11000) {
        DuplicateKeyError(err, req, res, next);
    } else if (err.name === "JsonWebTokenError") {
        JsonWebTokenError(err, req, res, next);
    } else if (err.name === "TokenExpiredError") {
        TokenExpiredError(err, req, res, next);
    } else if (err.name === "ValidationError") {
        ValidationError(err, req, res, next);
    } else if (err.name === "NotFoundError") {
        NotFoundError(err, req, res, next);
    } else if (err.name === "UnauthorizedError") {
        UnauthorizedError(err, req, res, next);
    } else if (err.name === "InternalServerError") {
        InternalServerError(err, req, res, next);
    } else if (err.name === "BadRequestError") {
        BadRequestError(err, req, res, next);
    } else if (err.name === "PermissionError") {
        PermissionError(err, req, res, next);
    } else {
        DefaultError(err, req, res, next);
    }
};

