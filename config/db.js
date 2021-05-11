const mongoose = require("mongoose");

const connect = async () => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`Connected to Database`);
  } catch (err) {
    console.log(`Error: ${err}`);

    process.exit(1);
  }
};

module.exports = connect;
