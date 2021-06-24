const mongoose = require('mongoose');
const statusEnum = require('../utils/enums/homework.enum') 

const statusHomeworkSchema = mongoose.Schema({
    estado: {
        type: String,
        required: true,
        enum: statusEnum,
        unique: true
    },
}, {
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model('statusHomework', statusHomeworkSchema);