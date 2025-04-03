import { ObjectId } from 'mongodb';
import { getDb } from '../../config/mongodb.js';
import { productSchema } from './product.schema.js';
import { reviewSchema } from './review.schema.js';
import { categorySchema } from './category.schema.js';
import mongoose from 'mongoose';


const ProductModel = mongoose.model("products", productSchema);
const ReviewModel = mongoose.model("reviews", reviewSchema);
const CategoryModel = mongoose.model('category', categorySchema)
export default class ProductRepository{
    constructor(){
        this.collection = "products"
    }

    async addProduct(product){
        try {
            product.categories=product.category.split(',').map(e=> e.trim());
            console.log(product);
            // const db = getDb();
            // const products =await db.collection(this.collection);
            // await products.insertOne(product);
            const newProduct = new ProductModel(product);
            const savedProduct = await newProduct.save();
            await CategoryModel.updateMany(
                {_id: {$in: product.categories}},
                {$push: {products: new ObjectId(savedProduct._id)}}
            )
            return savedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProduct(){
        try {
            const db = getDb();
            const collections =await db.collection(this.collection);
            const products =await collections.find().toArray();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getOneProduct(id){
        try {
            const db = getDb();
            const products =await db.collection(this.collection);
            return await products.findOne({
                _id: new ObjectId(id)
            });
        } catch (error) {
            console.log(error);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category=category;
            }
            return await collection.find(filterExpression).toArray();
            
        }catch(err){
            console.log(err);
        }
    }

    async rate(userID, productID, rating){
        try{
            // 1. Check if product exists
            const productToUpdate = await ProductModel.findById(productID);
            if(!productToUpdate){
                throw new Error("Product not found")
            }

            // Find the existing review
            const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
            console.log(userReview);
            if(userReview){
                userReview.rating = rating;
                await userReview.save();
            }else{
                const newReview = new ReviewModel({
                    product: new ObjectId(productID),
                    user: new ObjectId(userID),
                    rating: rating
                });
                newReview.save();
            }
            // const db = getDb();
            // const collection = db.collection(this.collection);

            // await collection.updateOne({
            //     _id: new ObjectId(productID)
            // },
            // {
            //     $pull: {
            //         ratings: {
            //             userID: new ObjectId(userID)
            //         }
            //     }
            // })

            // await collection.updateOne({
            //     _id:new ObjectId(productID)
            // },{
            //     $push: {ratings: {userID:new ObjectId(userID), rating}}
            // })

        }catch(err){
            console.log(err);
        }
    }


}