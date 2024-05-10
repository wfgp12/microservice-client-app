const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response-utils");

const handleErrorsValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json(errorResponse(errors.errors[0].msg, 400));
};

module.exports = { 
    handleErrorsValidate 
}