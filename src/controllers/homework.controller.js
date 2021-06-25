const homeworkStatus = require('../utils/enums/homework.enum');
const HomeworkModel = require("../models/homework");
const Joi = require("@hapi/joi");
const dayjs = require("dayjs");

// create homework
const postHomework = async (req, res) => {
  // Validation homework
  const schemaRegister = Joi.object({
    usuario: Joi.string().required(),
    compromiso: Joi.string().min(3).max(5000).required(),
    fechaLimite: Joi.date().required(),
  });

  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { usuario, compromiso, fechaLimite, fechaCumplimiento, estado } = req.body;

  const homework = new HomeworkModel({
    usuario,
    compromiso,
    fechaLimite,
    fechaCumplimiento,
    estado
  });
  //console.log(homework)

  try {
    const savedHomework = await homework.save();
    res.json({
      error: null,
      data: savedHomework,
    });
  } catch (error) {
    console.dir(error);
    res.status(400).json({ error });
  }
};

// all list homework
const getAllHomework = async (req, res) => {
  let homework = await HomeworkModel.find().populate('usuario');
  homework = await AtrasadaStatus(homework)
  console.log(homework)
  res.json(homework);
};

// list homework for user id
const getHomework = async (req, res) => {
  let homeworkUser = await HomeworkModel.find({
    usuario: req.params.HomeworkId,
  }).populate('usuario');
  homeworkUser = await AtrasadaStatus(homeworkUser)

  if (homeworkUser) {
    return res.json({
      message: "Busqueda realizada con exito",
      homeworkUser,
    });
  } else {
    return res.json({
      message: "Busqueda fallida",
    });
  }
};

// list homework for user id and status homework
const getStatusHomework = async (req, res) => {
  const homeworkUser = await HomeworkModel.find({
    usuario: req.params.HomeworkId,
    estado: req.params.StatusId,
  });

  if (homeworkUser) {
    return res.json({
      message: "Busqueda realizada con exito",
      homeworkUser,
    });
  } else {
    return res.json({
      message: "Busqueda fallida",
    });
  }
};

// edit homework
const updateHomeworkById = async (req, res) => {
  let homeworkUpdate = await HomeworkModel.findByIdAndUpdate(
    req.params.HomeworkId,
    req.body,
    {
      new: true,
    }
  );
  homeworkUpdate = await AtrasadaStatus(homeworkUpdate)
  res.status(200).json({ 
    message: "Tarea modificada con exito!", homeworkUpdate 
  });
};

// delete homework
const deleteById = async (req, res) => {
  let homeworkDelete = await HomeworkModel.findByIdAndDelete(
    req.params.HomeworkId  
  );
  homeworkDelete = await AtrasadaStatus(homeworkDelete)
  res.status(200).json({ message: "Tarea elimina con exito!", homeworkDelete });
};

// check de la tarea
const checkHomework = async (req, res) => {
  const homework = await HomeworkModel.findById(req.params.HomeworkId);
  const timely = dayjs().diff(dayjs(homework.fechaLimite));

  if(timely <= 0) {
     homework.estado = homeworkStatus.realizado
  } else {
     homework.estado = homeworkStatus['realiazado tarde']
  }

    await homework.save()
    return res.json({
        ok: true,
        homework: homework.estado
    })

};

// function homework atrasada
const AtrasadaStatus = async (atrasada) => {
    let variables = [...atrasada]
    variables.forEach((esperando,index) => {
        const timely = dayjs().diff(dayjs(esperando.fechaLimite));
        if(esperando.estado == homeworkStatus.pendiente){
            if(timely > 0){
                variables[index].estado = homeworkStatus.atrasado
            }
        }
    });

    return variables
};


module.exports = {
  postHomework,
  getAllHomework,
  getHomework,
  getStatusHomework,
  updateHomeworkById,
  deleteById,
  checkHomework
};
