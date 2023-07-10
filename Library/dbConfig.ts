import {createConnection, /*Connection*/} from "mongoose";

function dbConfig () {
    const mongoDB_URI = process.env.mongoDB_URI!;
    let mongoConn = createConnection(mongoDB_URI);
    /*async function dbConn () {
        mongoConn = await createConnection(mongoDB_URI).asPromise();
    }
    dbConn().catch(err => {throw new Error(err)});*/
    return mongoConn;
}

export default dbConfig;
