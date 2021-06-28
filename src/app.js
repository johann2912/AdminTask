const express = require('express');
require('dotenv').config()
require('./dataBase')
const PDF = require('pdfkit');
const fs = require('fs');
const reportGerencial = require('./controllers/reportGerencial.controller');

    
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

    // status homework
    //const statushomework = require('./routes/statusHomework.routes')

    // Homeworks
    const homework = require('./routes/homework.routes');

    // report Gerencial
    const report = require('./routes/reportGerencial.routes');
const { stringify } = require('querystring');
    
// Routes Middlewares
    // user
    app.use('/user', userRoute);
    
    //rol
    app.use('/role', roleRoute);
    
    // auth
    app.use('/auth', authRoute);

    // status homework
    //app.use('/statusHomework', statushomework);

    // homework
    app.use('/homework', homework);

    // report Gerencial
    app.use('/report', report)


// Generar Pdf
let doc = new PDF();
doc.pipe(fs.createWriteStream(__dirname + '/reporte.pdf'));
doc.text('Reporte generencial sobre la tasa de cumplimiento en actividades asignadas',{
    align: 'center'
});

const Task = reportGerencial

doc.text(Task);

doc.end();
console.log('documento generado')


// Running server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

