const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// for "/" path

router
  .route("/")
  // create index route
  .get(wrapasync(listingController.index))
  //  create post route to new listing
  .post(
    isLoggedIn,

    upload.single("listing[image]"),
    validateListing,
    wrapasync(listingController.createListing)
  );

// render new form for create listing

router.get("/new", isLoggedIn, listingController.renderNewForm);

// "/:id" path

router
  .route("/:id")
  // create show route

  .get(wrapasync(listingController.showListing))

  // create update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapasync(listingController.updateListing)
  )

  // create delete route
  .delete(isLoggedIn, isOwner, wrapasync(listingController.deleteListing));

// create edit route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapasync(listingController.renderEditForm)
);

module.exports = router;
