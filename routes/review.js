const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/review.js");

const {
  isLoggedIn,
  validateReview,
  isReviewAuther,
} = require("../middleware.js");

// for reviews

// create a review Route
router.post(
  "/",
  isLoggedIn,

  validateReview,
  wrapasync(reviewController.createReview)
);

// create a review post delete route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuther,
  wrapasync(reviewController.deleteReview)
);

module.exports = router;
