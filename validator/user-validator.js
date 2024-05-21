const { body } = require("express-validator");
const { validateToken } = require("./auth-validator");
const { findUserService } = require("../services/user-service");

module.exports = {
    createUserValidator: [
        body('name').notEmpty().withMessage('El nombre es requerido').bail(),
        body('lastName').notEmpty().withMessage('El apellido es requerido').bail(),
        body('email').isEmail().withMessage('Ingrese un correo electrónico válido').bail()
        .custom(async(email) => {
            const user = await findUserService({email});
            if (user) {
                throw new Error('Este email ya se encuentra registrado')
            }
            return true;
        }).bail(),
        body('phoneNumber').notEmpty().withMessage('El número de teléfono es requerido').bail()
        .custom(async(phoneNumber) => {
            const user = await findUserService({phoneNumber});
            if (user) {
                throw new Error('Este numero de teléfono ya se encuentra registrado')
            }
            return true;
        }).bail(),
        body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }).bail()
    ],
    
    loginValidator: [
        body('email').isEmail().withMessage('Ingrese un correo electrónico válido').bail(),
        body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),
    ],

    updateUserValidator: [
        ...validateToken,
        body('name').optional().notEmpty().withMessage('El nombre es requerido').bail(),
        body('lastName').optional().notEmpty().withMessage('El apellido es requerido').bail(),
        body('email').optional().isEmail().withMessage('Ingrese un correo electrónico válido').bail(),
        body('phoneNumber').optional()
            .notEmpty().withMessage('El número de teléfono es requerido').bail()
            .custom(async(phoneNumber) => {
                const userExist = await findUserService({phoneNumber});
                if(userExist) throw new Error('Este numero de teléfono esta asociado a otro usuario')

                return true
            })
    ]
}