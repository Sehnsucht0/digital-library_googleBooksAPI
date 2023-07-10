import * as userBooksController from "../controllers/userBooksController";
import express from "express";
import passport from "passport";
import {Request, Response, NextFunction} from "express";
import { Schema, checkSchema } from "express-validator/src/middlewares/schema";

const router = express.Router();

const schema: Schema = {username: {notEmpty: true, isLength: {options: {min: 3, max: 15}}}, password: {notEmpty: true, isLength: {options: {min: 8, max: 20}}}};

router.post('/register', checkSchema(schema, ["body"]), userBooksController.create_user);
router.post('/login', passport.authenticate("local", {successRedirect: "/", failureRedirect: "/auth/fail"}));
router.get('/fail', function(req: Request, res: Response, next: NextFunction) {
    res.status(401).end();
});

export default router;
