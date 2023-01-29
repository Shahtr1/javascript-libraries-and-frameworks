require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passwordLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");

// const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/userDB");

// const userSchema = { email: String, password: String };
// change the above to proper mongoose schema, to add plugin for encryption
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passwordLocalMongoose);
userSchema.plugin(findOrCreate);

// we are not using encryption now but hash functions
// userSchema.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ["password"],
// });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
    }
  )
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  }
);

app
  .route("/login")

  .get((req, res) => {
    res.render("login");
  })

  .post((req, res) => {
    const user = User({
      username: req.body.username,
      password: req.body.passport,
    });

    req.logIn(user, (err) => {
      if (err) {
        console.log("err");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("secrets");
        });
      }
    });
  });

// .post((req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.findOne({ email: username }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, (err, result) => {
//           if (result === true) {
//             res.render("secrets");
//           }
//         });
//       }
//     }
//   });
// })

app.route("/secrets").get((req, res) => {
  User.find({ secret: { $ne: null } }, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

app
  .route("/submit")

  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  })

  .post((req, res) => {
    const submittedSecret = req.body.secret;
    User.findById(req.user.id, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(() => {
            res.redirect("/secrets");
          });
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
    User.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("secrets");
          });
        }
      }
    );
  });

// .post((req, res) => {
//   bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//     const newUser = new User({
//       email: req.body.username,
//       password: hash,
//     });

//     newUser.save((err) => {
//       err ? res.send(err) : res.render("secrets");
//     });
//   });
// })

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
