import {Request, Response, NextFunction} from "express";
import IUser from "../extend-request";
import * as userBooksController from "../controllers/userBooksController";
import express from "express";
const router = express.Router();

function checkAuth (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) next();
  else res.redirect('/auth/fail');
}

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).end();
});

router.post('/update', checkAuth, userBooksController.update_user_books);
router.post('/checkbook', checkAuth, userBooksController.check_user_book);
router.get('/getbooks', checkAuth, userBooksController.get_user_books);
router.post('/deletebook', checkAuth, userBooksController.remove_user_books);
router.get('/check', checkAuth, function(req: Request, res: Response, next: NextFunction) {
  res.status(200);
  const newreq = req.user as IUser;
  res.send(newreq?.username);
});
router.post("/logout", checkAuth, function(req: Request, res: Response, next: NextFunction) {
  req.logout(err => {
    if (err) next(err as unknown);
    req.session.destroy(err => next(err as unknown));
    res.status(200).end();
  });
});


export default router;
