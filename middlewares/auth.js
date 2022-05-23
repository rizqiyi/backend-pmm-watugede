const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token)
      return res.status(400).json({
        success: false,
        message: "No token, authorization denied.",
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res.status(400).json({
        success: false,
        message: "Token verification failed, authorization denied.",
      });

    req.user = verified.id;
    req.role = verified.role;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = middleware;
