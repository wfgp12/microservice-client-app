const express = require('express');

const router = express.Router();
const User = require('../models/users');

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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

router.get('/findUser', async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' }); // Internal Server Error
    }
});

// Update a user by ID (PUT)
router.put('/', async (req, res) => {
    try {
        const { id } = req.query;
        const { name, email, password } = req.body;
        const [updatedCount] = await User.update({ name, email, password }, { where: { id } });
        if (updatedCount === 0) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }
        const updatedUser = await User.findByPk(id);
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' }); // Internal Server Error
    }
});


// Delete a user by ID (DELETE)
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        const deletedCount = await User.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }
        res.status(204).json(); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' }); // Internal Server Error
    }
});
module.exports = router
