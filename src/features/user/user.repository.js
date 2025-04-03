import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ObjectId } from "mongodb";

const UserModel = mongoose.model('users', userSchema);
export default class UserRepository{
    async signUp(user){
        try {
            const newUser = new UserModel(user);
            await newUser.save()
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }


    async signIn(email, password){
        try {
            return await UserModel.findOne({email, password});
        } catch (error) {
            console.log(error);
        }
    }
    
    async signInByEmail(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
        }
    }

    async resetPassword(userId, hashPassword){
        try {
            const user = await UserModel.findById(new ObjectId(userId));
            if(user){
                user.password = hashPassword;
                user.save();
            } else{
                console.log("User not found")
            }
        } catch (error) {
            console.log(error);
        }
    }
}