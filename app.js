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

const { corsOptions } = require("./utilities/cors");

const app = express();
dotenv.config({ path: "./.env" });
connect();

app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("API Desa Watugede"));

app.use(`/api/auth`, admin);
app.use(`/api/activity`, activity);
app.use(`/api/kartu_keluarga`, kartu_keluarga);
app.use(`/api/kelahiran`, kelahiran);
app.use(`/api/kematian`, kematian);
app.use(`/api/penduduk`, penduduk);
app.use(`/api/penduduk_keluar`, penduduk_keluar);
app.use(`/api/penduduk_masuk`, penduduk_masuk);
app.use(`/api/keterangan`, keterangan_keluar);
app.use(`/api/signature`, signatures);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `🚀Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}🚀`
  )
);
