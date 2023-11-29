const passport = require("passport");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("./config");
const User = require("./controllers/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// set up Passport for Google OAuth 2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => { // initial login/signup function
      const filter = { googleId: profile.id };

      const data = {
        googleId: profile.id,
        username: profile.displayName,
        picture: profile.photos[0].value,
      };
      
      const user = await User.findByOrCreate(filter, data);
      console.log("signing up/logging in")
      done(null, profile);
    }
  )
);

passport.serializeUser((providerData, done) => {
  done(null, providerData);
});

/**
 * Here we get all the data of the provider (in this case only Google OAuth 2.0)
 * This is executed whenever we try to authenticate using passport.authenticate
 */
passport.deserializeUser(async (providerData, done) => {
  try {
    if (providerData.provider === "google") {
      let user = await User.findOne({ googleId: providerData.id });
      if (!user) {
        done(null, false, { error: "no user" });
      } else {
        done(null, user);
      }
    }
  } catch (error) {
    console.error(error);
  }
});
