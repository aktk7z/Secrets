const mongoose = require("mongoose");
const dbConnector = require(`${__dirname}/dbConnector.js`);
const dbName = "userDB";

const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

mongoose.set("useCreateIndex", true);

class userDB {
  constructor() {
    this.connect = () => dbConnector.connectDB(dbName);

    this.userSchema = new mongoose.Schema({
      username: String,
      password: String,
      googleId: String,
    });

    this.userSchema.plugin(passportLocalMongoose);
    this.userSchema.plugin(findOrCreate);
    this.User = mongoose.model("User", this.userSchema);

    passport.use(this.User.createStrategy());

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      this.User.findById(id, (err, user) => {
        done(err, user);
      });
    });

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLEA_AUTH_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/auth/google/secrets",
          // A future proof for Google + Deprecated
          userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        (accessToken, refreshToken, profile, cb) => {
          console.log(profile);
          // Note: findOrCreate is NOT a mongoose function
          this.User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return cb(err, user);
          });
        }
      )
    );
  }
}

module.exports = userDB;
