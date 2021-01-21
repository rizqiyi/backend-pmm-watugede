const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const kelahiran = require("./routes/kelahiran.route");
const kematian = require("./routes/kematian.route");
const penduduk = require("./routes/penduduk.route");
const keterangan_keluar = require("./routes/keterangan_keluar.route");
const penduduk_keluar = require("./routes/penduduk_keluar.route");
const penduduk_masuk = require("./routes/keterangan_masuk.route");
const admin = require("./routes/admin.route");
const kartu_keluarga = require("./routes/kartu_keluarga.route");
const signatures = require("./routes/letters-signature.route");
const activity = require("./routes/activity.route");

const connect = require("./config/db");

const app = express();
dotenv.config({ path: "./config/config.env" });
connect();

app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());

app.use(`${process.env.AUTH_URI}`, admin);
app.use(`${process.env.ACTIVITY_URI}`, activity);
app.use(`${process.env.KK_URI}`, kartu_keluarga);
app.use(`${process.env.KELAHIRAN_URI}`, kelahiran);
app.use(`${process.env.KEMATIAN_URI}`, kematian);
app.use(`${process.env.PENDUDUK_URI}`, penduduk);
app.use(`${process.env.PENDUDUK_KELUAR_URI}`, penduduk_keluar);
app.use(`${process.env.PENDUDUK_MASUK_URI}`, penduduk_masuk);
app.use(`${process.env.KETERANGAN_URI}`, keterangan_keluar);
app.use(`${process.env.SIGNATURES_URI}`, signatures);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(
    `🚀Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}🚀`
  )
);
