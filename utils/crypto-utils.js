const bcrypt = require('bcryptjs');

async function encryptData(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
}

async function compareEncryptedData(data, encryptedData) {
    return await bcrypt.compare(data, encryptedData);
}

module.exports = { encryptData, compareEncryptedData };
