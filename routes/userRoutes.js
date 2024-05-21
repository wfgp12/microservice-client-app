const express = require('express');

const router = express.Router();

const { 
    createUserController, 
    loginController, 
    finAllUSerController, 
    findUserController, 
    updateUserController, 
    deleteUserController, 
    validateTokenController
} = require('../controllers/user-controller');

const { createUserValidator, loginValidator, updateUserValidator } = require('../validator/user-validator');
const { handleErrorsValidate } = require('../validator/handle-errors');
const { validateToken } = require('../validator/auth-validator');

router.post('/', [
    createUserValidator,
    handleErrorsValidate
], createUserController);

router.post('/login', [
    loginValidator,
    handleErrorsValidate
], loginController);


router.post('/validate-token', [
    validateToken,
    handleErrorsValidate
], validateTokenController);

router.get('/', [
    validateToken,
    handleErrorsValidate
], finAllUSerController)

router.get('/:id', [
    validateToken,
    handleErrorsValidate
], findUserController);

router.put('/:id', [
    updateUserValidator,
    handleErrorsValidate
], updateUserController);


router.delete('/', [
    validateToken,
    handleErrorsValidate
], deleteUserController);

module.exports = router
