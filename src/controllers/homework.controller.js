const HomeworkModel = require("../models/homework");
const statusHomework = require("../models/statusHomework");
const Joi = require("@hapi/joi");

const daysjs = require("dayjs");
const { date } = require("@hapi/joi");
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

  const { usuario, compromiso, fechaLimite, fechaCumplimiento, estado } =
    req.body;
  const estadoDB = await statusHomework.findOne({
    estado: "pendiente",
  });

  const homework = new HomeworkModel({
    usuario,
    compromiso,
    fechaLimite,
    fechaCumplimiento,
    estado: estadoDB._id,
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
  const homework = await HomeworkModel.find();
  res.json(homework);
};

// list homework for user id
const getHomework = async (req, res) => {
  const homeworkUser = await HomeworkModel.find({
    usuario: req.params.HomeworkId,
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
  const homeworkUpdate = await HomeworkModel.findByIdAndUpdate(
    req.params.HomeworkId,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ message: "Tarea modificada con exito!", homeworkUpdate });
};

// delete homework
const deleteById = async (req, res) => {
  const homeworkDelete = await HomeworkModel.findByIdAndDelete(
    req.params.HomeworkId
  );
  res.status(200).json({ message: "Tarea elimina con exito!", homeworkDelete });
};

// check de la tarea
const checkHomework = async (req, res) => {
  const homework = await HomeworkModel.findById(req.params.HomeworkId);
  const timely = dayjs().diff(dayjs(homework.fechaLimite));

  if(timely <= 0) {
    const realizada = await statusHomework.findOne({
        estado: 'realizado'
    })
        console.dir('on time')
      homework.estado = realizada._id
  } else {
      const tarde = await statusHomework.findOne({
          estado: 'realizado tarde'
      })
      console.dir('not on time')
      homework.estado = tarde._id
  }

    await homework.save()
    return res.json({
        ok: true
    })
    
};

module.exports = {
  postHomework,
  getAllHomework,
  getHomework,
  getStatusHomework,
  updateHomeworkById,
  deleteById,
  checkHomework,
};
