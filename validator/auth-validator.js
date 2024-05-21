const { header } = require("express-validator");
const { verifyToken } = require("../utils/auth-utils");
const { findUserService } = require("../services/user-service");

const validateToken = [
    header('Authorization')
        .exists().withMessage('Token de sesión requerido en los headers').bail()
        .custom(async (value, { req }) => {
            const token = value.split(' ')[1];
            const decodedToken = verifyToken(token);

            if (!decodedToken) {
                throw new Error('Token de sesión inválido');
            }
            try {
                req.body.user = await findUserService({ id: decodedToken.userId }, { exclude: ['password', 'createdAt', 'updatedAt'] });
                return true;
            } catch (error) {
                throw new Error('Token de sesión inválido');
            }
        }).bail()
]

module.exports = {
    validateToken
}