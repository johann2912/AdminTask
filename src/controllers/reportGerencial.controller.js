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

    let totalTasks = pendiente+atrasado+realizado+realizado_tarde
    console.log(`El número total de tareas son: ${totalTasks}`)

    console.log(
        `Compromisos pendientes: ${pendiente}`,
        `Compromisos atrasados: ${atrasado}`,
        `Compromisos realizados: ${realizado}`,
        `Compromisos realizados tardes: ${realizado_tarde}`
    )
    
    // porcentaajes totales
    let pendientess = (totalTasks / 0.10) / pendiente
    let atrasadass = (totalTasks / 0.10) / atrasado
    let realizadoss = (totalTasks / 0.10) / realizado
    let realizadoTardee = (totalTasks / 0.10) / realizado_tarde

    console.log(pendientess, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(atrasadass, "##############################")
    console.log(realizadoss, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(realizadoTardee, "#########################")
    
    let porcentaje = (pendientess+atrasadass+realizadoss+realizadoTardee) / 0.10
    console.log(porcentaje)


    //console.log(statusTask)
    res.json(monthHomeworks)
    
}

module.exports = reportGerencial