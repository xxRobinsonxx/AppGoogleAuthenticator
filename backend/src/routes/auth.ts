import { Router } from 'express';
import {
  register,
  verify2FASetup,
  login,
  verify2FALogin,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/verify-2fa-setup', verify2FASetup);
router.post('/login', login);
router.post('/verify-2fa-login', verify2FALogin);

export default router;