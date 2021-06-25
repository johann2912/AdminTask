const mongoose = require("mongoose");
const { Types } = mongoose; // const type = mongoose.Types
const homeworkStatus = require('../utils/enums/homework.enum')

const HomeworkSchema = mongoose.Schema(
  {
    usuario: {
      ref: "user",
      type: Types.ObjectId,
      required: true,
    },
    compromiso: {
      type: String,
      required: true,
      min: 3,
    },
    fechaLimite: {
      type: Date,
      required: true,
    },
    fechaCumplimiento: {
      type: Date,
      required: false,
    },
    estado: {
      type: String,
      default: homeworkStatus.pendiente
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = mongoose.model("homework", HomeworkSchema);