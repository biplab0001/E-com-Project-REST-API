import express from 'express';
import CartItemController from './cartItems.controller.js';
const routes = express.Router();

const cartItemController = new CartItemController();


routes.post('/', (req, res)=>{
    cartItemController.addCart(req,res);
});
routes.delete('/', (req, res)=>{
    cartItemController.deleteItems(req,res);
});
routes.get('/', (req, res)=>{
    cartItemController.getItems(req,res);
});

export default routes;