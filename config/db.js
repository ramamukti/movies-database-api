import pg from 'pg';
import 'dotenv/config';

const Pool = pg.Pool;

const db = new Pool({
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    else{
        console.log('Connected to the database successfully.')
    }
});

export default db;