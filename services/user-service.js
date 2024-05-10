const User = require('../models/users');

module.exports = {
    findUserService: async(where, attributes) => {
        try {
            return await User.findOne({ 
                where,
                attributes
            });
        } catch (error) {
            throw new Error('Internal Server error')
        }
    },
    findAllUserService: async() => {
        try {
            return await User.findAll({
                attributes: { exclude: ['password'] }
            });
        } catch (error) {
            throw new Error('Internal Server error');
        }
    },
    userCreateService: async(user) => {
        try {
            return await User.create(user);
        } catch (error) {
            throw new Error('Internal Server error')
        }
    },
    updateUserService: async(newData, where) => {
        try {
            console.log(newData, where);
            return await User.update(newData, {where});
        } catch (error) {
            throw new Error('Internal Server error')
        }
    },
    deleteUserService: async(id) => {
        try {
            await User.destroy({ where: { id } });
        } catch (error) {
            throw new Error('Internal Server error')
        }
    }
}