const db= require('../../db.config.js');
const Note =db.note;
exports.createNote = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log('userId:', userId);
        // console.log('req.body:', req.body);
        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId });
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error in createNotes' });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const { title, content } = req.body;

        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        const [updatedRowsCount, updatedNote] = await Note.update(
            { title, content },
            { where: { id: noteId, userId }, returning: true }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note updated successfully', note: updatedNote[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.deleteNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        
        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const deletedRowCount = await Note.destroy({ where: { id: noteId, userId } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getNotes = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 5; 
        const offset = (page - 1) * limit;
        const { count, rows } = await Note.findAndCountAll({
            where: { userId },
            offset,
            limit,
            order: [['createdAt', 'DESC']] 
        });

      
        if (count === 0) {
            return res.status(404).json({ message: 'No notes found' });
        }
        const totalPages = Math.ceil(count / limit);
        res.json({
            totalNotes: count,
            totalPages,
            currentPage: page,
            notes: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

