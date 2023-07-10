import {Schema, model, Types} from "mongoose";
import dbConfig from "../dbConfig";
const conn = dbConfig();

interface UserAcc {
    username: string,
    password: string,
    books: Types.ObjectId;
}

const userSchema = new Schema<UserAcc>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    books: {type: Schema.Types.ObjectId, ref: "userBooks"}
})

const User = conn.model<UserAcc>("User", userSchema);

export default User;