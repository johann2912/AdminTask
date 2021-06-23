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
    // user
    const  userRoute  = require('./routes/user.routes');
    
    // rol
    const roleRoute = require('./routes/role.routes');

// Routes Middlewares
    // user
    app.use('/user', userRoute);
    
    //rol
    app.use('/role', roleRoute);
    
// Running server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

