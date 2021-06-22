const mongoose = require('mongoose');
const statusEnum = require('../utils/enums/homework.enum') 

const statusHomeworkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: statusEnum
    },
}, {
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model('statusHomework', statusHomeworkSchema);