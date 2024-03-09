import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey);
    return token;
}

const verifyToken = (token) => {
    const verifiedUser = jwt.verify(token, secretKey);
    return verifiedUser;
}

export {generateToken, verifyToken};