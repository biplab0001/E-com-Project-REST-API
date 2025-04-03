import { ObjectId } from 'mongodb';
import { getClient, getDb } from '../../config/mongodb.js';
import OrderModel from './order.model.js';

export default class OrderRepository {

    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){
        const client = getClient();
        const session = client.startSession();
        try {
            session.startTransaction();
            const db = getDb();
            const orders = await this.calculateOrder(userId, session);
            const totalAmount = orders.reduce((acc , item)=> acc + item.totalAmount, 0);

            const order = new OrderModel(userId, totalAmount, new Date());
            await db.collection(this.collection).insertOne(order, {session});

            for(let order of orders){
                await db.collection("products").updateOne(
                    {_id: new ObjectId(order.productId)},
                    {$inc: {stock: -order.quantity}},
                    {session}
                )
            }

            await db.collection("carts").deleteMany({
                userId: userId
            }, {session});
            session.commitTransaction();
            session.endSession();
            return;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log(error)
        }
}

    async calculateOrder(userId, session){
        try {
            const db = getDb();
            const orders = await db.collection("carts").aggregate([
                
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $addFields: {
                        productId: { $toObjectId: "$productId" }  // Convert string to ObjectId
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productInfo"
                    }
                },
                {
                    $unwind: "$productInfo"
                },
                {
                    $set: {
                        "totalAmount":{
                            $multiply: ["$productInfo.price", "$quantity"]
                        }
                    }
                }
                
            ], {session}).toArray()
            return orders;
        } catch (error) {
            console.log(error);
        }
    }
}