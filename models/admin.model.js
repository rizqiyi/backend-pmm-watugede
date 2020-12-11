const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  foto_profil: {
    type: String,
  },
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
});

module.exports = mongoose.model("admin", AdminSchema);
