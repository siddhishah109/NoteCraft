const express = require('express');

const { createNote, getNotes , getNoteById , updateNote ,deleteNote} = require('../controllers/notesController.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');

const router = express.Router();

router.post('/', authenticateUser, createNote);
router.get('/', authenticateUser, getNotes);
router.get('/:id', authenticateUser, getNoteById);
router.put('/:id', authenticateUser, updateNote);
router.delete('/:id', authenticateUser, deleteNote);



module.exports = router;

