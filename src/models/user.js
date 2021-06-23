const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const { Types } = mongoose // const type = mongoose.Types

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
    },
    document: {
        type: String,
        required: true
    },
    document_number: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    rol:
        {
        ref: "Role",
        type: Types.ObjectId
        }

},{
    timestamps: true,
    versionkey: false
})

// encrypt password
userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// compare password
userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword)
    
}


module.exports = mongoose.model('user', userSchema);