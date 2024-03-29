const express = require('express');
const colors=require('colors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
