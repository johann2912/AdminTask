const HomeworkModel = require("../models/homework");
const dayjs = require("dayjs");

// report gerencial
const reportGerencial = async (req, res) => {
    
    let dateInit = dayjs(req.body.date).startOf('month').format('YYYY-MM-DD HH:mm:ss')
    let dateFinish = dayjs(req.body.date).endOf('month').format('YYYY-MM-DD HH:mm:ss')

    let homeworksss = await HomeworkModel.find().where('createdAt').gte(dateInit).lte(dateFinish)
    
    res.json(homeworksss)
}


module.exports = reportGerencial