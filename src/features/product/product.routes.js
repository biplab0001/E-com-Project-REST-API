import express from 'express';
import ProductManagement from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const routes = express.Router();

const productManager = new ProductManagement();

routes.post('/rating', (req,res)=>{
    productManager.rateProduct(req,res);
});
routes.get('/filter', (req,res)=>{
    productManager.filterProducts(req,res);
});
routes.get('/', (req,res)=>{
    productManager.getAllProduct(req,res);
});
routes.post('/', upload.single('imageUrl'), (req,res)=>{
    productManager.addProduct(req,res);
});
routes.get('/:id', (req,res)=>{
    productManager.getOneProduct(req,res);
});



export default routes;