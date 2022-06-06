const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin.model");
const ActivitySchema = require("../models/activity.model");

exports.getAdminData = async (req, res) => {
  try {
    const t = await AdminSchema.findById(req.user).select("-password");

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    return res.status(200).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllAdminData = async (req, res) => {
  try {
    const t = await AdminSchema.find().select([
      "username",
      "nama_lengkap",
      "role",
      "createdAt",
    ]);

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    return res.status(200).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.postLoginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });

    const t = await AdminSchema.findOne({ username });

    if (!t)
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
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
      { id: t.id, role: t.role },
      process.env.JWT_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          success: true,
          message: `Hi, ${t.nama_lengkap}`,
          id: t._id,
          token,
        });
      }
    );

    await AdminSchema.findByIdAndUpdate(t._id, {
      $push: {
        activity: activity._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const checkAdmin = await AdminSchema.findById(req.params.id);

    if (!checkAdmin) throw new Error("Admin tidak ditemukan");

    await AdminSchema.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Admin berhasil dihapus",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const checkAdmin = await AdminSchema.findById(req.params.id);

    if (!checkAdmin) throw new Error("Admin tidak ditemukan");

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password || "", salt);

    await AdminSchema.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          nama_lengkap: req.body.nama_lengkap,
          role: req.body.role,
          ...(req.body.password ? { password: hash } : {}),
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin berhasil diperbarui",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, nama_lengkap, role } = req.body;

    const isEmpty = !username || !password || !nama_lengkap || !role;

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
      nama_lengkap,
      password,
      role,
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
          { expiresIn: 3600 * 24 * 7 },
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
      message: err,
    });
  }
};
