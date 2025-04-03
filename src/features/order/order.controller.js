import OrderRepository from "./order.repository.js";

export default class OrderController {

    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res){
        try {
            const userId = req.body.userId;
            const order = await this.orderRepository.placeOrder(userId);
            res.status(201).send("Order has been placed");
        } catch (error) {
            console.log(error)
        }
    }
}