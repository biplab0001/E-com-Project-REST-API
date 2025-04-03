import { connectToMongoDb, getDb } from '../../config/mongodb.js';
export default class UserRepository{

    async signUp(user){
        try {
            const db = getDb();
            const users =await db.collection("users");
            await users.insertOne(user);
            // user.id = users.length+1;
            // users.push(user);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(email, password){
        try {
            const db = getDb();
            const users =await db.collection("users");
            return await users.findOne({email, password});
            // user.id = users.length+1;
            // users.push(user);
        } catch (error) {
            console.log(error);
        }
    }

    async signInByEmail(email){
        try {
            const db = getDb();
            const users =await db.collection("users");
            return await users.findOne({email});
        } catch (error) {
            console.log(error);
        }
    }
    
}