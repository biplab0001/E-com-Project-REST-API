import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    quantity: Number
})