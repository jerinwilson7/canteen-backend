const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) =>
      console.error("mongoose connection error: " + process.env.MONGO_URI + err)
    );
};

module.exports = connectDatabase;
