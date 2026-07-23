import * as noteService from '../services/noteService.js';

export const createNewNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    const note = await noteService.createNote(req.user.userId, title, content);
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const getMyNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getNotesByUser(req.user.userId);
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

export const updateExistingNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updated = await noteService.updateNote(id, req.user.userId, title, content);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.message.includes('unauthorized') || error.message.includes('not found')) {
      error.status = 404;
    }
    next(error);
  }
};

export const deleteExistingNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    await noteService.deleteNote(id, req.user.userId);
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    if (error.message.includes('unauthorized') || error.message.includes('not found')) {
      error.status = 404;
    }
    next(error);
  }
};