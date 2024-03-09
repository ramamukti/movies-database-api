import express from 'express';
import authRouter from './auth.routes.js'
import movieRouter from './movie.routes.js';

const router = express.Router();

router.get('/', (req, res) =>{
    res.json({"message": "Welcome to movies-database API"})
});

router.use('/auth', authRouter);
router.use('/movies', movieRouter);

export default router;