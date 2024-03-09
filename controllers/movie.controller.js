import db from '../config/db.js';

class MovieController {
    static findAll = async (req, res, next) => {
        try {
            const paginationQuery = pagination(req.query);

            const findAllSQL = `
                SELECT 
                    title,
                    genres,
                    year 
                FROM movies
                ${paginationQuery} 
            `;
            
            const result = await db.query(findAllSQL);
            res.status(200).json({
                data: result.rows,

            });
        } 
        catch (err) {
            next(err);
        }
    };

    static findOne = async (req, res, next) => {
        try {
            const {id} = req.params;
            const findOneSQL = `
                SELECT * 
                FROM movies
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);
            res.status(200).json(result.rows);
        } 
        catch (err) {
            next(err)
        }
    };

    static create = async (req, res, next) => {
        try {
            const {title, genres, year} = req.body;
            const createSQL = `
                INSERT INTO movies (title, genres, year)
                    VALUES ($1, $2, $3)
                RETURNING *
            `;
            const result = await db.query(createSQL, [title, genres, year]);
            res.status(201).json(result.rows[0]);
        } 
        catch (err) {
            next(err)
        }
    };    

    static update = async (req, res, next) => {
        try {
            const {id} = req.params;
            let {title, genres, year} = req.body;

            //Find Movie by id
            const findOneSQL = `
                SELECT * 
                FROM movies
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);

            // If the result doesn't exist
            if (result.rows.length === 0) {
                throw {name: 'Error: Not Found', message: 'Movie Not Found'}
            }
            else {
                // Update movie data 
                const updateSQL = `
                    UPDATE movies 
                    SET
                        title = $2,
                        genres = $3,
                        year = $4
                    WHERE id = $1 
                `;

                const currentData = result.rows[0];

                title = title || currentData.title;
                genres = genres || currentData.genres;
                year = year || currentData.year;

                await db.query(updateSQL, [title, genres, year]);
                res.status(200).json({ message: 'Movie data updated successfully.'})
            }
        } 
        catch (err) {
            next(err)
        }
    };

    static destroy = async (req, res, next) => {
        try {
            const {id} = req.params;

            //Find Movie by id
            const findOneSQL = `
                SELECT id 
                FROM movies
                WHERE id = $1 
            `;
            const result = await db.query(findOneSQL, [id]);

            // If the movie doesn't exist
            if (result.rows.length === 0) {
                throw {name: 'Error: Not Found', message: 'Movie Not Found'}
            }
            else {
                // Update movie data 
                const deleteSQL = `
                    DELETE FROM movies 
                    WHERE id = $1 
                `;
                await db.query(deleteSQL, [id]);
                res.status(200).json({ message: 'Movie data deleted successfully.'})
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


export default MovieController;