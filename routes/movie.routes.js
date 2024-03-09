import express from 'express';
import MovieController from '../controllers/movie.controller.js'
import {authentication, authorization} from '../middlewares/auth.js';

const router = express.Router();

// Access Movies data just need authenthication
router.use(authentication);

router.get('/', MovieController.findAll);
router.get('/:id', MovieController.findOne);

// Access some methods need authorization
router.post('/', authorization, MovieController.create);
router.put('/:id', authorization, MovieController.update);
router.delete('/:id', authorization, MovieController.destroy);

export default router;