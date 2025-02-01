import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../models/userModel.js";
import passport from "passport";

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTTOKEN_KEY;

const ConfigPassport = (passport) =>{
    passport.use(new jwtStrategy(opts, (jwt_paload,done)=>{
         console.log(jwt_paload)
 }))
}

export default ConfigPassport;