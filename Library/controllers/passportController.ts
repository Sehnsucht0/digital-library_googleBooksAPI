import { Strategy as LocalStrategy } from "passport-local";
import IUser from "../extend-request";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { PassportStatic } from "passport";

function passportController (passport: PassportStatic) {
    passport.use(new LocalStrategy(async function verify (username, password, done) {
        const user = await User.findOne({username: username}, "username password").exec().catch(err => done(err as unknown));
        if (!user) return done(null, false, {message: "Username not found."});
    
        const auth = await bcrypt.compare(password, user.password).catch(err => done(err as unknown));
        if (!auth) done(null, false, {message: "Incorrect password."});
        else done(null, user);
    }));

    passport.serializeUser(function (user, done) {
        const newuser = user as IUser;
        done(null, newuser.username);
    });

    passport.deserializeUser(async function (username, done) {
        const user = await User.findOne({username: username}, "-password").exec().catch(err => done(err as unknown));
        if (!user) return done(null, false);

        done(null, user);
    });
}

export default passportController;
