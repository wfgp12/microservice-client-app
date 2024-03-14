const express = require('express');

const router = express.Router();
const User = require('../models/users');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(users);
    } catch (err) {
        console.log('Error al obtener los Usuarios ', err);
        res.status(500).send('Internal Server Error')
    }
})

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router
