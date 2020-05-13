import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { googleCredentials } from "../credentials.mjs";

import { User } from "../models/user.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: googleCredentials.clientID,
      clientSecret: googleCredentials.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user exists in database
      User.findOne({
        googleId: profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          //user exists
          console.log("user is : " + currentUser);
          done(null, currentUser);
        } else {
          //create new user
          new User({
            name: profile.name.givenName,
            surname: profile.name.familyName,
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new user created : " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

export default passport;
