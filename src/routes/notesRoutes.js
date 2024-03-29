const express = require('express');

const { createNote, getNotes } = require('../controllers/notesController.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');

const router = express.Router();

router.post('/', authenticateUser, createNote);
router.get('/', authenticateUser, getNotes);

module.exports = router;

