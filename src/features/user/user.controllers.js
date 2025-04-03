import UserModel from './user.models.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signUp(req, res){
        try {
            const {name, email, password, type} = req.body;
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = {
                name: name,
                email: email,
                password: hashPassword,
                type: type,
            }
            const createdUser = await this.userRepository.signUp(newUser);
            // const createdUser = UserModel.signUp(newUser);
            res.status(200).send(createdUser);
        } catch (error) {
            console.log(error);
        }
        
    }

    async signIn(req, res){
        try {
            const user = await this.userRepository.signInByEmail(req.body.email);
            // const user = UserModel.signIn(req.body.email, req.body.password);

            if(!user){
                res.status(400).send("Incorrect Credentials");
            } else {
                //create token
                const result = await bcrypt.compare(req.body.password, user.password);
                if(result){
                    const token = jwt.sign(
                        {
                            userId: user.id,
                            email: user.email 
                        },
                        process.env.JWT_TOKEN,
                        {
                            expiresIn: '1h'
                        }
                    )
                    res.status(200).send(token);
                } else {
                    res.status(400).send("Incorrect Credentials");
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }


    async resetPassword(req, res){
        try {
            const { userId, newPassword } = req.body;
            const hashPassword = await bcrypt.hash(newPassword, 10);
            await this.userRepository.resetPassword(userId, hashPassword);
            res.status(200).send("Password is updated");
        } catch (error) {
            console.log(error);
        }
    }
}