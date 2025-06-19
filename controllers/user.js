const User = require("../models/user.js");

// for render signup form

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// for new signup

module.exports.signupUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to the app!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

// for render login form

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// for login user

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// for logout user

module.exports.logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    // req.flash("success", "goodbye");
    res.redirect("/listings");
  });
};
