const jwt = require('jsonwebtoken');
const HttpCode = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages")
const ErrorMessage = require("../composer/error-response");
const dotenv =  require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const secret = process.env.JWT_SECRET

    if (!token) {
        return res.status(HttpCode.UNAUTHORIZED).send(new ErrorMessage(AppMessages.UNAUTHORIZED));
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(HttpCode.UNAUTHORIZED).send(new ErrorMessage(AppMessages.AUTHENTICATION_ERROR));
        }

        req.userId = decoded.id; 
        next();
    });
};

module.exports = verifyToken;
