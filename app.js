const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const kelahiran = require("./routes/kelahiran.route");

const connect = require("./config/db");

const app = express();
dotenv.config({ path: "./config/config.env" });
connect();

app.use(express.json());
app.use("/api/kelahiran", kelahiran);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode in PORT ${PORT}`)
);
