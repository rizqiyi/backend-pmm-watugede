const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin.model");
const ActivitySchema = require("../models/activity.model");

exports.getAdminData = async (req, res) => {
  res.send("hello");
};

exports.postLoginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Please enter all fields.",
      });

    const t = await AdminSchema.findOne({ username });

    if (!t)
      return res.status(400).json({
        success: false,
        message: "False",
      });

    const isMatch = await bcrypt.compare(password, t.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const activity = await ActivitySchema.create({
      activity_name: `${t.nama_lengkap} Telah Login.`,
      activity_by: t._id,
    });

    jwt.sign(
      { id: t.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 * 12 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          success: true,
          message: `Welcome ${t.nama_lengkap}. Have a nice day!`,
          token,
          data: t,
        });
      }
    );

    await AdminSchema.findByIdAndUpdate(t._id, {
      $push: {
        activity: activity._id,
      },
    });
  } catch (err) {}
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
          "Admin dengan username ini sudah ada. Harap menggunakan username lain.",
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
