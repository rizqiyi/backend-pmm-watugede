const ActivitySchema = require("../models/activity.model");
const AdminSchema = require("../models/admin.model");

exports.getActivityData = async (req, res) => {
  try {
    const all = await ActivitySchema.find();

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
      data: all,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.postActivityWhenLogOut = async (req, res) => {
  try {
    const findUser = await AdminSchema.findById(req.params.id);

    if (!findUser)
      return res.status(400).json({
        success: false,
        message: "Admin Not Found",
      });

    const activity = await ActivitySchema.create({
      activity_name: `${findUser.nama_lengkap} Telah Logout.`,
      activity_by: findUser._id,
    });

    await AdminSchema.findByIdAndUpdate(
      { _id: findUser._id },
      {
        $push: {
          activity: activity._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Sukses Logout",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
