import express from 'express';
import UserController from './user.controllers.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
import jwtMiddileware from '../../middlewares/jwt.middleware.js'

const routes = express.Router();

const userController = new UserController();

routes.post('/signUp', (req,res)=>{
    userController.signUp(req,res);
});

routes.post('/signin', (req,res)=>{
    userController.signIn(req,res);
});

routes.post('/reset', jwtMiddileware , (req,res)=>{
    userController.resetPassword(req,res);
});


export default routes;