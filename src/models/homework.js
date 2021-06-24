const mongoose = require("mongoose");
const { Types } = mongoose; // const type = mongoose.Types

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
      ref: "statusHomework",
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = mongoose.model("homework", HomeworkSchema);