import mongoose from "mongoose";
import { categorySchema } from '../features/product/category.schema.js'
const url = process.env.DB_URL;


export function connectToMongooseDb(){
    try {
            mongoose.connect(url).then(
                ()=>{
                    console.log("Mongoose db connected");
                    addCategories();
                }
            ).catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
}

async function addCategories(){
    const CategoryModel = mongoose.model("category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added");
}

