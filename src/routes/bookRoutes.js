import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
} from '../controllers/bookController.js';

const router = Router();

router.get('/', getAllBooksHandler);                       // public
router.get('/:id', getBookByIdHandler);                   // public
router.post('/', authenticate, createBookHandler);        // ADMIN only
router.put('/:id', authenticate, updateBookHandler);      // ADMIN only
router.delete('/:id', authenticate, deleteBookHandler);   // ADMIN only

export default router;