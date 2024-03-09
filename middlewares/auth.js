import {verifyToken} from "../utils/jwt.js";
import db from "../config/db.js";

const authentication = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const verifiedUser = verifyToken(token);
            
            // Find logged user by id 
            const {id} = verifiedUser;

            const findOneSQL = `
                SELECT * 
                FROM users
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);
            
            if (result.rows.length === 0) {
                throw {message: 'Access token not found'}
            }
            else {
                const foundUser = result.rows[0];

                req.loggedUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    role: foundUser.role
                };

                next()
            }
        }
        else{
            throw {message: "Unauthenticated."}
        }
    } 
    catch (err) {
        next(err)
    }
}

const authorization = (req, res, next) => {
    try {
        const {role} = req.loggedUser;

        if (role === 'Administrator') {
            next()
        }
        else {
            throw {
                name: 'Unathorized'
            }
        }
    } 
    catch (err) {
        next(err)    
    }
}


export {authentication, authorization};