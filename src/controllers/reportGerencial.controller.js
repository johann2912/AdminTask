const HomeworkModel = require("../models/homework");
const StatusHomework = require("../utils/enums/homework.enum")
const dayjs = require("dayjs");
const user = require("../models/user");

// report gerencial
const reportGerencial = async (req, res) => {
    
    let dateInit = dayjs(req.body.start).toDate()
    let dateFinish = dayjs(req.body.end).toDate()

    let monthHomeworks = await HomeworkModel.find().where('createdAt').gte(dateInit).lte(dateFinish)
    let statusTask = await monthHomeworks.monthHomeworks
    console.log(statusTask)
    
    res.json(monthHomeworks)
    
}


module.exports = reportGerencial