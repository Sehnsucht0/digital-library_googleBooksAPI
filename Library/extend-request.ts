import { Types } from "mongoose";

interface IUser {
    username: string
    books: Types.ObjectId
}

export default IUser;