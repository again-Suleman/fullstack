const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()


const hashPassword = async (password) => {
    const saltRounds = 5;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        console.error('Error comparing passwords:', err);
        throw err;
    }
};

const generateToken = (user) => {
    console.log("The User:", user)
    const secret = process.env.JWT_SECRET
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
};




module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};
