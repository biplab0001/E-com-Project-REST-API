import { ObjectId } from 'mongodb';
import { getDb } from '../../config/mongodb.js';
import CartItemModel from './cartItems.model.js';


export default class CartRepository{
    
    constructor(){
        this.collection = "carts"
    }

    async add(productId, userId, quantity){

        try {
            const db = getDb();
            const collections = await db.collection(this.collection);
            const id = await this.getNextCount(db);
            // const newCart = await collections.insertOne(productId, userId, quantity);
            const newCart = await collections.updateOne(
                {productId, userId}, 
                {
                    $setOnInsert: {_id: id},
                    $inc: {quantity: quantity}
                },
                {upsert: true}
            );
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async get(userId){

        try {
            const db = getDb();
            const collections = await db.collection(this.collection);
            const cart = await collections.find({userId: userId}).toArray();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(userId, cartId){

        try {
            const db = getDb();
            const collections = await db.collection(this.collection);
            await collections.deleteOne({
                userId: userId,
                _id: new ObjectId(cartId)
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getNextCount(db){
        const result = await db.collection("counters").findOneAndUpdate(
            {_id: 'cartItemid'},
            {
                $inc: { value: 1 }
            },
            {returnDocument: 'after'}
        )
        return result.value;
    }
}