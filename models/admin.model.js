const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    nama_lengkap: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    activity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activity_log",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", AdminSchema);
