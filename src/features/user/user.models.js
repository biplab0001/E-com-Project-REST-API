import { getDb } from "../../config/mongodb.js";

export default class UserModel{
    constructor( id, name, email, password, type){
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    // static async signUp(user){
    //     try {
    //         const db = getDb();
    //         const users =await db.collection("users");
    //         await users.insertOne(user);
    //         // user.id = users.length+1;
    //         // users.push(user);
    //         return user;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static signIn(email, password){
    //     const user = users.find(i=> i.email==email && i.password==password);
    //     return user;
    // }

    static getAll(){
        return users;
    }
    
}

// let users = [
//     new UserModel(
//         1,
//         "shruti",
//         "shruti@gmail.com",
//         "Password1",
//         "admin"
//     )
// ]