import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
import CartRepository from "./cartItems.repository.js";
export default class CartItemController {

    constructor(){
        this.cartRepository = new CartRepository();
    }

    async addCart(req, res){
        try {
            const {productId, userId,  quantity} = req.body;
            const createdcart = await this.cartRepository.add(productId, userId, quantity);
            res.status(201).send("cart has been updated");
        } catch(err){
            console.log(err)
        }
        
    }

    async getItems(req, res){
        try {
            const {userId} = req.body;
            const items = await this.cartRepository.get(userId);
            res.status(200).send(items);
        } catch (error) {
            console.log(error)
        }
    }

    async deleteItems(req, res){
        const {userId, cartId} = req.body;

        const isDeleted = await this.cartRepository.delete(userId, cartId);
        if(!isDeleted){
            res.status(400).send(err)
        } else{
            res.status(201).send("cart has been deleted");
            return isDeleted;
        }
    }
}