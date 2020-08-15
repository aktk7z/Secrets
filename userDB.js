const mongoose = require("mongoose");
const dbConnector = require(`${__dirname}/dbConnector.js`);
const encrypt = require("mongoose-encryption");

const dbName = "userDB";
const secret = "Secret Words.";

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

    this.userSchema.plugin(encrypt, {
      secret: secret,
      encryptedFields: ["password"],
    });

    this.User = mongoose.model("User", this.userSchema);
  }
}

module.exports = userDB;
