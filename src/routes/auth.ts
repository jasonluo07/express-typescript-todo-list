import { Router } from 'express';
import authController from '../controllers/authController';
import validateUserData from '../middleware/validateUserData';

const router = Router();

router.post('/register', validateUserData, authController.register);
router.post('/login', validateUserData, authController.login);

export default router;
