const homeworkModel = require('../models/homework');
const statusHomework = require('../models/statusHomework');
const Joi = require('@hapi/joi');

// create homework
const postHomework = async (req, res) => {

    // Validation homework 
    const schemaRegister = Joi.object({
        usuario: Joi.string().required(),
        compromiso: Joi.string().min(3).max(5000).required(),
        fechaLimite: Joi.date().required(),
        fechaCumplimiento: Joi.date().required()
    })

    const { error } = schemaRegister.validate(req.body)

    if(error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isHomeworkExist = await homeworkModel.findOne({ _id: req.params._id });
    if (isHomeworkExist) {
        return res.status(400).json(
            {error: 'La tarea ya ha sido creada'}
        )
    }

    const { usuario, compromiso, fechaLimite, fechaCumplimiento, estado }= req.body
    const estado = await statusHomework.findOne({
        estado: 'pendiente'
    })
    
    const homework = new homework({ usuario, compromiso, fechaLimite, fechaCumplimiento, estado: estado._id})
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