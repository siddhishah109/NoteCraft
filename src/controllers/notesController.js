const db= require('../../db.config.js');
const Note =db.note;
exports.createNote = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('userId:', userId);
        console.log('req.body:', req.body);
        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId });
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error in createNotes' });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.findAll({ where: { userId } });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};