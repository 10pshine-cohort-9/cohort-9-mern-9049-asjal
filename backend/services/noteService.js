import prisma from '../db.js';

export const createNote = async (userId, title, content) => {
  return await prisma.note.create({
    data: { title, content, userId },
  });
};

export const getNotesByUser = async (userId) => {
  return await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateNote = async (noteId, userId, title, content) => {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  
  if (!note || note.userId !== userId) {
    throw new Error('Note not found or unauthorized');
  }

  return await prisma.note.update({
    where: { id: noteId },
    data: { title, content },
  });
};

export const deleteNote = async (noteId, userId) => {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  
  if (!note || note.userId !== userId) {
    throw new Error('Note not found or unauthorized');
  }

  return await prisma.note.delete({
    where: { id: noteId },
  });
};