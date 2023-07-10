import {Request, Response, NextFunction} from "express";
import "dotenv/config";
import createError from "http-errors";
import express from "express";
import passport from "passport";
import * as path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import debugFunction from "debug";
import session from "express-session";
import MongoStore from "connect-mongo";
import dbConfig from "./dbConfig";
import { body } from "express-validator";
const debug = debugFunction("library:app");

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoConn = dbConfig();

import passportController from "./controllers/passportController";
passportController(passport);

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoConn.getClient(),
    collectionName: "sessions"
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(async function(req: Request, res: Response, next: NextFunction) {
  res.set("Access-Control-Allow-Origin", process.env.FRONTEND_SERVER);
  res.set("Access-Control-Allow-Credentials", "true");
  if (req.method === "POST") await body(["username", "password", "confirm-password"]).escape().run(req);
  next();
});
app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: unknown, req: Request, res: Response, next: NextFunction) {
  if (createError.isHttpError(err)) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).end();
    //res.render('error');
  }
  else {
    debug(err);
    res.status(500).send(err);
  }
});

export default app;
