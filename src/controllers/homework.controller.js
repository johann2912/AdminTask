const HomeworkModel = require('../models/homework');
const statusHomework = require('../models/statusHomework');
const Joi = require('@hapi/joi');

// create homework
const postHomework = async (req, res) => {

    // Validation homework 
    const schemaRegister = Joi.object({
        usuario: Joi.string().required(),
        compromiso: Joi.string().min(3).max(5000).required(),
        fechaLimite: Joi.date().required(),
    })

    const { error } = schemaRegister.validate(req.body)

    if(error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const { usuario, compromiso, fechaLimite, fechaCumplimiento, estado }= req.body
    const estadoDB = await statusHomework.findOne({
        estado: 'pendiente'
    })
    
    const homework = new HomeworkModel({ usuario, compromiso, fechaLimite, fechaCumplimiento, estado: estadoDB._id})
    console.log(homework)

    try {
        const savedHomework = await homework.save();
        res.json({
            error: null,
            data: savedHomework
        });
    } catch (error) {
        console.dir(error)
        res.status(400).json({error});
    }
}

module.exports =  postHomework; 