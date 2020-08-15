require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("express");

const userDB = require(`${__dirname}/userDB.js`);
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const db = new userDB();
db.connect();

app.get("/", (req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    db.User.findOne({ userName: req.body.username }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result && result.password === req.body.password) {
          res.render("secrets");
        }
      }
    });
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const newUser = new db.User({
      userName: req.body.username,
      password: req.body.password,
    });

    newUser.save();
    res.render("secrets");
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
