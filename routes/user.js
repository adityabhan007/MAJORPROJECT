// File: routes/user.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// for "/signup" path

router
  .route("/signup")
  // for render signup form

  .get(userController.renderSignupForm)
  // for new signup

  .post(wrapasync(userController.signupUser));

// for "/login" path

router
  .route("/login")

  // for render login form

  .get(userController.renderLoginForm)

  // for login user

  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser
  );

// for logout user

router.get("/logout", userController.logoutUser);

module.exports = router;
