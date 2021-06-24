const HomeworkModel = require('../models/statusHomework')
const StatusHomework = require('../utils/enums/homework.enum')

const postHomework = async (req, res) => {

    if(!StatusHomework.includes(req.body.estado)){
        return res.json({
            ok: false
        })
    }
    const  newEstado = new HomeworkModel(req.body)
    await newEstado.save()
    return res.json({
        ok: true
    })

}

module.exports = postHomework