import './env.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './src/features/product/product.routes.js';
import cartRoutes from './src/features/cart/cartItems.routes.js';
import userRoutes from './src/features/user/user.routes.js';
import orderRoutes from './src/features/order/order.routes.js'
import besicAuthorization from './src/middlewares/besicAuth.middleware.js'
import jwtMiddileware from './src/middlewares/jwt.middleware.js';
import logMiddleware from './src/middlewares/logger.midddleware.js';
import { connectToMongoDb } from './src/config/mongodb.js';
import { connectToMongooseDb } from './src/config/mongooseConfig.js';

const server = express();
let corsOption = {
    origin: '*',
    allowedHeaders: '*',
    allowedMethods: '*'
}
server.use(cors(corsOption));
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');

//     //return ok for preflight request
//     if(req.method === "OPTIONS"){
//         return res.sendStatus(200);
//     }
// })

server.use(bodyParser.json());

server.use(logMiddleware);

// server.use('/api/product', besicAuthorization , productRoutes);
server.use('/api/product', jwtMiddileware , productRoutes);
server.use('/api/cart', jwtMiddileware , cartRoutes);
server.use('/api/order', jwtMiddileware , orderRoutes);
server.use('/api/user', userRoutes);

server.get('/', (req,res)=>{
    res.send("Welcome to E-commerce website")
});

// Handel 400 error
server.use((req,res)=>{
    res.status(404).send("This API/page is not exist");
})

server.listen(3000, ()=>{
    console.log("server is running at 3000");
    // connectToMongoDb();
    connectToMongooseDb()
})