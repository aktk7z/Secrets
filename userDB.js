const mongoose = require("mongoose");
const dbConnector = require(`${__dirname}/dbConnector.js`);
const dbName = "userDB";

const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

mongoose.set("useCreateIndex", true);

class userDB {
  constructor() {
    this.connect = () => dbConnector.connectDB(dbName);

    this.userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Need User Name"],
      },
      password: String,
    });

    this.userSchema.plugin(passportLocalMongoose);
    this.User = mongoose.model("User", this.userSchema);

    passport.use(this.User.createStrategy());

    passport.serializeUser(this.User.serializeUser());
    passport.deserializeUser(this.User.deserializeUser());
  }
}

module.exports = userDB;
