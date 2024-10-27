const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    dateoftask:{
        require:true,
        type:Date,
    },
    assignedTo: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    LastDate_of_submision: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("task", taskSchema);