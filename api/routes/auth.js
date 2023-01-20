const passport = require("../auth");
const express = require("express");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  function (req, res) {}
);

module.exports = router;
