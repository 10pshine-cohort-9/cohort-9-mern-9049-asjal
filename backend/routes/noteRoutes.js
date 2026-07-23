import express from 'express';
import { createNewNote, getMyNotes, updateExistingNote, deleteExistingNote } from '../controllers/noteController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.post('/', createNewNote);
router.get('/', getMyNotes);
router.put('/:id', updateExistingNote);
router.delete('/:id', deleteExistingNote);

export default router;