const express = require("express");
const passport = require("passport");
const { CLIENT_URL } = require("../config");
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
    failureMessage: true,
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
    failureMessage: true,
  })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    // res.status(200).json({
    //     success: true,
    //     message: "Successful",
    //     user: req.user,
    //     // cookies: req.cookies
    // });

    res.status(201).redirect(CLIENT_URL);
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
    // cookies: req.cookies
  });
});

module.exports = router;
