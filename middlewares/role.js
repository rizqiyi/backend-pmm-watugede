const role = require("../config/constant.js");

const roleMiddleware = async (req, res, next) => {
  try {
    if (req.role === role["admin"]) {
      throw new Error("You are not allowed to do this action");
    }

    if (req.role === role["super-admin"]) {
      next();
    } else {
      throw new Error("You are not allowed to do this action");
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = roleMiddleware;
