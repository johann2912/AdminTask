const mongoose = require('mongoose');
const { Types } = mongoose // const type = mongoose.Types

const homeworkSchema = mongoose.Schema({
    encargado: {
        type: String,
        required: true,
        min: 3
    },
    compromiso: {
        type: String,
        required: true,
        min: 3,
    },
    fechaCumplimiento: {
        type: Date,
        required: true,
    },
    estado:[
        {
        ref: "statusHomework",
        type: Types.ObjectId
        }
    ]
},{
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model('homework', homeworkSchema);
