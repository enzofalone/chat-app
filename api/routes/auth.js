const express = require("express");
const passport = require("passport");
const { CLIENT_URL } = require("../config");
const router = express.Router();

// middleware
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
    failureMessage: true,
  })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
