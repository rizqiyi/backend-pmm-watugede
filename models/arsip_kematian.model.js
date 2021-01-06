const mongoose = require("mongoose");

const KematianSchema = mongoose.Schema(
  {
    arsip_kematian: {
      type: String,
    },
    pemilik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kematian",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("arsip_kematian", KematianSchema);
