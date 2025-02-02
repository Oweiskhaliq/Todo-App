import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../models/userModel.js";

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTTOKEN_KEY;

const ConfigPassport = (passport) => {
  passport.use(
    new jwtStrategy(opts, async (jwt_paload, done) => {
      try {
        const user = await userModel.findById({ _id: jwt_paload.id });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default ConfigPassport;
