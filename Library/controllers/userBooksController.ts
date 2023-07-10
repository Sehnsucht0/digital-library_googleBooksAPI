import {Types} from "mongoose";
import IUser from "../extend-request";
import userBooks from "../models/userBooksModel";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import {Request, Response, NextFunction} from "express";

async function get_user_books(req: Request, res: Response, next: NextFunction) {
    const newreq = req.user as IUser;
    const allBooks = await userBooks.findById(newreq?.books, "books -_id").exec().catch(err => next(err as unknown));
    res.status(200);
    res.json(allBooks);
}

async function check_user_book(req: Request, res: Response, next: NextFunction) {
    const newreq = req.user as IUser;
    const bookToCheck = await userBooks.findById(newreq?.books).elemMatch("books", {$eq: req.body.workID}).exec().catch(err => next(err as unknown));
    if(bookToCheck) res.status(200).end();
    else res.status(404).end();
}

async function update_user_books(req: Request, res: Response, next: NextFunction) {
    const newreq = req.user as IUser;
    const inserted = await userBooks.findByIdAndUpdate(newreq?.books, {$push: {books: req.body.workID}}).exec().catch(err => next(err as unknown));
    res.status(200).end();
}

async function remove_user_books(req: Request, res: Response, next: NextFunction) {
    const newreq = req.user as IUser;
    const updated = await userBooks.findByIdAndUpdate(newreq?.books, {$pull: {books: req.body.workID}}).exec().catch(err => next(err as unknown));
    res.status(200).end();
}

async function create_user(req: Request, res: Response, next: NextFunction) {
    const checkSame = await User.findOne({username: req.body.username}).exec().catch(err => next(err as unknown));
    if (checkSame) {
        res.status(409).end();
        return;
    }
    const booksId = new Types.ObjectId;
    const books = new userBooks({_id: booksId, books: []});
    const hashedPassword = await bcrypt.hash(req.body.password, 10).catch(err => next(err as unknown));

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        books: booksId
    });
    try {
        await books.save();
        await user.save();
        res.status(200).end();
    }
    catch (err) {
        next(err);
    }
}

export {create_user, update_user_books, get_user_books, remove_user_books, check_user_book}