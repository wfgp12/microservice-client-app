const jwt = require('jsonwebtoken');
// require('dotenv').config();

const secret_key = process.env.SECRET_KEY;
function generateToken(payload) {
    return jwt.sign(payload, secret_key, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret_key);
        return decoded;
    } catch (error) {
        return null; 
    }
}

module.exports = { generateToken, verifyToken };
