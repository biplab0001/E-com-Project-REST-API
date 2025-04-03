import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    category: String,
    price: Number,
    stock: Number,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'reviews'
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'category'
        }
    ]
})