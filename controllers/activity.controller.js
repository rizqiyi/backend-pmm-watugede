const ActivitySchema = require("../models/activity.model");

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
