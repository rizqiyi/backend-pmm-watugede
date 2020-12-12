const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin.model");
const ActivitySchema = require("../models/activity.model");

exports.getAdminData = async (req, res) => {
  res.send("hello");
};

exports.postLoginAdmin = async (req, res) => {
  res.send("hello");
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, nama_lengkap, avatar } = req.body;

    const isEmpty =
      !username || !email || !password || !nama_lengkap || !avatar;

    if (isEmpty)
      return res.status(400).json({
        success: false,
        message: "Please enter all fields.",
      });

    const checkAdmin = await AdminSchema.findOne({
      username: req.body.username,
    });

    if (checkAdmin)
      return res.status(400).json({
        success: false,
        message:
          "Admin dengan username ini sudah ada. Harap menggunakan username lain",
      });

    const t = await AdminSchema.create({
      username,
      email,
      nama_lengkap,
      password,
      avatar,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(t.password, salt, async (err, hash) => {
        if (err) throw err;

        t.password = hash;

        const admin = await t.save();

        jwt.sign(
          { id: admin.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 * 12 },
          (err, token) => {
            if (err) throw err;

            return res.status(201).json({
              success: true,
              message: "Admin telah berhasil didaftarkan.",
              token,
              data: admin,
            });
          }
        );
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
