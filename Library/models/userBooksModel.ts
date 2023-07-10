import {Schema, model, Types} from "mongoose";
import dbConfig from "../dbConfig";
const conn = dbConfig();

interface UserAccBooks {
    _id: Types.ObjectId;
    books: Types.Array<string>,
}

const userBookSchema = new Schema<UserAccBooks>({
    _id: {type: Schema.Types.ObjectId, required: true},
    books: {type: [String], required: true},
})

const userBooks = conn.model<UserAccBooks>("UserBook", userBookSchema);

export default userBooks;