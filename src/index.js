const express = require('express');
const colors=require('colors');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const app = express();
const authRoutes = require('./routes/authRoutes.js');
const PORT = process.env.PORT || 3001;
app.use(morgan('dev'));
app.use(bodyParser.json());


const db = require('../db.config.js');

async function syncDatabase() {
    try {
        await db.sequelize.sync({ alter: true });
        console.log(colors.bgBlue('Database synchronized successfully.'));
    } catch (error) {
        console.error(colors.red('Error synchronizing database:'), error);
    }
}

syncDatabase();


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(PORT, () => {
    console.log(colors.bgBlue(`Server is running on port ${PORT}`));
});
