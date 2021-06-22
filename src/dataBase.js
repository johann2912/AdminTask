const mongoose = require('mongoose');

// conexión dataBase
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.mgx44.mongodb.net/${process.env.DBNAME}`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.error(err))

const db = mongoose.connection
db.once('open', _ => {
    console.log(`Database connected: ${url}`)
})

db.on('error', err => {
    console.error(`connection error: ${err}`)
})