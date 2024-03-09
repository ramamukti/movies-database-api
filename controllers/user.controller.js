import db from '../config/db.js';

class UserController {
    static findAll = async (req, res, next) => {
        try {
            const paginationQuery = pagination(req.query);

            const findAllSQL = `
                SELECT *
                FROM users
                ${paginationQuery} 
            `;
            
            const result = await db.query(findAllSQL);
            res.status(200).json(result.rows);
        } 
        catch (err) {
            next(err);
        }
    };

    // Find spesific user by id
    static findOne = async (req, res, next) => {
        try {
            const {id} = req.params;
            const findOneSQL = `
                SELECT * 
                FROM users
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);
            res.status(200).json(result.rows);
        } 
        catch (err) {
            next(err)
        }
    };

    // Update spesific user role
    static update = async (req, res, next) => {
        try {
            const {id} = req.params;
            let {role} = req.body;

            //Find User by id
            const findOneSQL = `
                SELECT * 
                FROM users
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);

            // If the result doesn't exist
            if (result.rows.length === 0) {
                throw {name: 'Error: Not Found', message: 'User Not Found'}
            }
            else {
                // Update user data 
                const updateSQL = `
                    UPDATE users 
                    SET role = $2,
                    WHERE id = $1 
                `;

                const currentData = result.rows[0];

                email = email || currentData.email;
                gender = gender || currentData.gender;
                password = password || currentData.password;
                role = role || currentData.role;

                await db.query(updateSQL, [role]);
                res.status(200).json({ message: 'User role updated successfully.'})
            }
        } 
        catch (err) {
            next(err)
        }
    };

    static destroy = async (req, res, next) => {
        try {
            const {id} = req.params;

            //Find user by id
            const findOneSQL = `
                SELECT id 
                FROM users
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);

            // If the user doesn't exist
            if (result.rows.length === 0) {
                throw {name: 'Not Found', message: 'User Not Found'}
            }
            else {
                // Update user data 
                const deleteSQL = `
                    DELETE FROM users 
                    WHERE id = $1 
                `;
                await db.query(deleteSQL, [id]);
                res.status(200).json({ message: 'User data deleted successfully.'})
            }
        } 
        catch (err) {
            next(err)
        }
    }
};

const pagination = (queryParams) => {
    // If there's no query params
    if(Object.entries(queryParams) === 0) {
        return ''
    }
    else {
        let {limit, page} = queryParams;

        const defaultLimit = 10;

        limit = limit || defaultLimit;
        page = page || 1;

        return `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
    }
}

export default UserController;