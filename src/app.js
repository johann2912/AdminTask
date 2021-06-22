const express = require('express');
require('dotenv').config()
require('./dataBase')

// Capture Body
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Running server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

