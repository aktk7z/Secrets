const mongoose = require("mongoose");
const dbConnector = require(`${__dirname}/dbConnector.js`);
const md5 = require("md5");

const dbName = "userDB";

class userDB {
  constructor() {
    this.connect = () => dbConnector.connectDB(dbName);

    this.userSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: [true, "Need User Name"],
      },
      password: {
        type: String,
        required: [true, "Need User Name"],
      },
    });

    this.User = mongoose.model("User", this.userSchema);
  }
}

module.exports = userDB;
