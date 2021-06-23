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

    // auth
    const authRoute = require('./routes/auth.routes');
    
// Routes Middlewares
    // user
    app.use('/user', userRoute);
    
    //rol
    app.use('/role', roleRoute);
    
    // auth
    app.use('/auth', authRoute);
// Running server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

