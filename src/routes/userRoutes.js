import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/userController.js';

const router = Router();

router.get('/', authenticate, getAllUsersHandler);         // ADMIN only
router.get('/:id', authenticate, getUserByIdHandler);     // self or ADMIN
router.put('/:id', authenticate, updateUserHandler);      // self or ADMIN
router.delete('/:id', authenticate, deleteUserHandler);   // self or ADMIN

export default router;