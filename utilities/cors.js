const whitelist = [
  "http://localhost:3000",
  "https://populationsystem.vercel.app",
];

exports.corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
