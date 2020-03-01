const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    errorCount: {
      type: Number
    },
    errorLog: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const errorsLog = mongoose.model("errorsLog", errorSchema);

module.exports = errorsLog;
