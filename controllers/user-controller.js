const { 
    userCreateService, 
    findAllUserService, 
    findUserService, 
    updateUserService, 
    deleteUserService 
} = require("../services/user-service");

const { generateToken } = require("../utils/auth-utils");
const { encryptData, compareEncryptedData } = require("../utils/crypto-utils");
const { successResponse, errorResponse } = require("../utils/response-utils");

module.exports = {
    createUserController: async (req, res) => {
        try {
            const { name, lastName, email, phoneNumber, password } = req.body;
            const encryptPassword = await encryptData(password);

            const user = await userCreateService({
                name,
                lastName,
                email,
                phoneNumber,
                password: encryptPassword
            })
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    loginController: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await findUserService({ email }, { exclude: ['createdAt', 'updatedAt'] });

            if (!user) return res.status(404).json(errorResponse('User no found', 404));
            const { password: userPsw, ...userWithoutPsw } = user.toJSON();

            const isCorrectPassword = await compareEncryptedData(password, userPsw);
            if (!isCorrectPassword) return res.status(401).json(errorResponse('Contraseña incorrecta', 401));

            const token = generateToken({ userId: userWithoutPsw.id });

            res.status(201).json(successResponse({ userWithoutPsw, token }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    finAllUSerController: async (req, res) => {
        try {
            const users = await findAllUserService();
            
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    findUserController: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await findUserService({ id }, { exclude: ['password'] });
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // Not Found
            }
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    updateUserController: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, lastName, email, phoneNumber } = req.body;
            
            const [updatedCount] = await updateUserService({ name, email, lastName, phoneNumber }, { id })
            
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'User not found' }); // Not Found
            }
            const updatedUser = await findUserService({id}, {exclude:['password', 'createdAt', 'updatedAt']});
            res.status(201).json(successResponse(updatedUser));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    deleteUserController: async (req, res) => {
        try {
            const { id } = req.query;
            const deletedCount = deleteUserService(id);
            if (deletedCount === 0) {
                return res.status(404).json(errorResponse('User not found', 404)); 
            }
            res.status(204).json(successResponse(true)); 
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
}