import db from "../config/db.js";
import {hashPassword, comparePassword} from '../utils/bcrypt.js';
import {generateToken} from '../utils/jwt.js';

class AuthController {
    static register = async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const defaultRole = 'User';
            
            const hashedPassword = hashPassword(password);

            const createSQL = `
                INSERT INTO users (email, password, role)
                    VALUES ($1, $2, $3)
                RETURNING *
            `;
            const result = await db.query(createSQL, [email, hashedPassword, defaultRole]);
            res.status(201).json(result.rows);
        } 
        catch (err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const findOneSQL = `
                SELECT * 
                FROM users
                WHERE email = $1 
            `;
            const result = await db.query(findOneSQL, [email]);

            if (result.rows.length === 0) {
                throw {message: 'User Not Found.'}
            }
            else {
                const foundUser = result.rows[0];

                if (comparePassword(password, foundUser.password)) {
                    const accessToken = generateToken({
                        id: foundUser.id,
                        email: foundUser.email,
                        role: foundUser.role 
                    });
                    res.status(200).json({
                        message: "Login success.",
                        accessToken
                    });
                }
                else{
                    throw {message: 'Invalid Credential.'}
                }
            }
        } 
        catch (err) {
            next(err);
        }
    }
}

export default AuthController;