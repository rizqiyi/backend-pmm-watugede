const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema(
  {
    activity_name: {
      type: String,
    },
    activity_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activity_log", ActivitySchema);
