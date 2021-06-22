const express = require('express');
require('dotenv').config()
require('./dataBase')

// Capture Body
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// RUTAS
app.get('/api', (req, res) => {
    res.json('Bienvenido')
})

// Import routes
const  userRoute  = require('./routes/user.routes');

// Routes Middlewares
app.use('/user', userRoute);
// Running server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

