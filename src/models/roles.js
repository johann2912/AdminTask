const mongoose = require('mongoose');
const userRol = require('../utils/enums/user.enum');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: userRol
    },
},{
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model('Role', roleSchema);