import express from 'express';
import OrderController from './order.controller.js';

const routes = express.Router();

const orderController = new OrderController();

routes.post('/', (req,res)=>{
    orderController.placeOrder(req,res);
});



export default routes;