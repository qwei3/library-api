import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getAllRecordsHandler,
  getRecordByIdHandler,
  getMyRecordsHandler,
  createRecordHandler,
  updateRecordHandler,
  deleteRecordHandler
} from '../controllers/recordController.js';

const router = Router();

router.get('/', authenticate, getAllRecordsHandler);       // admin only
router.get('/my', authenticate, getMyRecordsHandler);      // logged in user's own records
router.get('/:id', authenticate, getRecordByIdHandler);    // admin or owner
router.post('/', authenticate, createRecordHandler);       // any user
router.put('/:id', authenticate, updateRecordHandler);     // admin or owner
router.delete('/:id', authenticate, deleteRecordHandler);  // admin 

export default router;