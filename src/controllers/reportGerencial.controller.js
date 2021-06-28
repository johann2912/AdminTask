const HomeworkModel = require("../models/homework");
const StatusHomework = require("../utils/enums/homework.enum")
const dayjs = require("dayjs");

// report gerencial
const reportGerencial = async (req, res) => {
    
    let dateInit = dayjs(req.body.start).toDate()
    let dateFinish = dayjs(req.body.end).toDate()

    let monthHomeworks = await HomeworkModel.find().where('createdAt').gte(dateInit).lte(dateFinish)
    //res.json(monthHomeworks)

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
    
    let PorcentPendientes = Math.round((pendiente / totalTasks) * 100)
    let PorcentAtrasadas = Math.round((atrasado / totalTasks) * 100)
    let PorcentRealizados = Math.round((realizado / totalTasks) * 100)
    let PorcentTarde = Math.round((realizado_tarde / totalTasks) * 100)
    

    console.log(`Compromisos pendientes: ${pendiente}, esto es igual al ${PorcentPendientes}%`)
    console.log(`Compromisos atrasados: ${atrasado}, esto es igual al ${PorcentAtrasadas}%`)
    console.log(`Compromisos realizados: ${realizado}, esto es igual al ${PorcentRealizados}%`)
    console.log(`Compromisos realizados tardes: ${realizado_tarde}, esto es igual al ${PorcentTarde}%`)

    let porcentaje = Math.round(PorcentPendientes + PorcentAtrasadas + PorcentRealizados + PorcentTarde)
    console.log(`Todo esto equivale al ${porcentaje}% fecha inicio: ${dateInit} y fecha final: ${dateFinish}`)
    
    return res.json({
        PorcentPendientes,
        PorcentAtrasadas,
        PorcentRealizados,
        PorcentTarde
    })
  
}



module.exports = reportGerencial