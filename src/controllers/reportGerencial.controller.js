const HomeworkModel = require("../models/homework");
const StatusHomework = require("../utils/enums/homework.enum")
const dayjs = require("dayjs");

// report gerencial
const reportGerencial = async (req, res) => {
    
    let dateInit = dayjs(req.body.start).toDate()
    let dateFinish = dayjs(req.body.end).toDate()

    let monthHomeworks = await HomeworkModel.find().where('createdAt').gte(dateInit).lte(dateFinish)
    
    let pendiente = 0
    let atrasado = 0
    let realizado = 0
    let realizado_tarde = 0

    monthHomeworks.forEach(function(statusTask, index){
        if(statusTask.estado == StatusHomework.realizado){
            realizado++
        }
        
        if(statusTask.estado == StatusHomework["realiazado tarde"]){
            realizado_tarde++
        }

        if(statusTask.estado == StatusHomework.pendiente){
            const timely = dayjs().diff(dayjs(statusTask.fechaLimite));
            if(timely > 0){
                monthHomeworks[index].estado = StatusHomework.atrasado
                atrasado++
            }else{
                pendiente++
            }
        }
        //console.log(`${index} => ${statusTask.estado}`)
    });

    let totalTasks = pendiente + atrasado + realizado + realizado_tarde
    console.log(`El número total de tareas son: ${totalTasks}`)
    
    // porcentaajes totales
    
    let pendientess = Math.round((pendiente / totalTasks) * 100)
    let atrasadass = Math.round((atrasado / totalTasks) * 100)
    let realizadoss = Math.round((realizado / totalTasks) * 100)
    let realizadoTardee = Math.round((realizado_tarde / totalTasks) * 100)
    

    console.log(`Compromisos pendientes: ${pendiente}, esto es igual al ${pendientess}%`)
    console.log(`Compromisos atrasados: ${atrasado}, esto es igual al ${atrasadass}%`)
    console.log(`Compromisos realizados: ${realizado}, esto es igual al ${realizadoss}%`)
    console.log(`Compromisos realizados tardes: ${realizado_tarde}, esto es igual al ${realizadoTardee}%`)

    let porcentaje = Math.round(pendientess+atrasadass+realizadoss+realizadoTardee)
    console.log(`Todo esto equivale al ${porcentaje}% de las tareas totales que se encuentran entre ${dateInit} y ${dateFinish}`)


    //console.log(statusTask)
    res.json(monthHomeworks)
    
}

module.exports = reportGerencial