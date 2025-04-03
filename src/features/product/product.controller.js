import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductManagement {

    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProduct(req, res){
        try {
            const products = await this.productRepository.getAllProduct();
            res.status(200).send(products);
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(req, res){
        
        try {
            const {name, price, category, desc, sizes} = req.body;
            const newProduct = new ProductModel(name, desc, req?.file?.filename, category, parseFloat(price), sizes?.split(','));
            const createdProduct = await this.productRepository.addProduct(newProduct);
            res.status(201).send(createdProduct);
        } catch (error) {
            console.log(error);
        }
    }

    async filterProducts(req, res) {
        try{
            const minPrice = req.body.minPrice;
            const maxPrice = req.body.maxPrice;
            const category = req.body.category;
            const result = await this.productRepository.filter(
                minPrice,
                maxPrice,
                category
            );
            res.status(200).send(result);
        } catch(err){
          console.log(err);
          return res.status(200).send("Something went wrong");
        }
    }

    async getOneProduct(req, res){
        try {
            const id = req.params.id;
            const product = await this.productRepository.getOneProduct(id);
            if(!product){
                res.status(404).send("Product not found");
            } else {
                return res.status(200).send(product);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async rateProduct(req, res){
        try {
            const userId = req.body.userId;
            const productId = req.body.productId;
            const rating = req.body.rating;

            await this.productRepository.rate(userId, productId, rating);
            res.status(200).send('Successfully added the rating');
        } catch (error) {
            console.log(error);
        }
    }
}