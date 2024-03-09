import express from 'express';
import UserController from '../controllers/user.controller.js'
import {authentication, authorization} from '../middlewares/auth.js';

const router = express.Router();

// Access Users data need authenthication and authorization
router.use(authentication);

router.get('/', authorization, UserController.findAll);
router.get('/:id', authorization, UserController.findOne);
router.put('/:id', authorization, UserController.update);
router.delete('/:id', authorization, UserController.destroy);

export default router;