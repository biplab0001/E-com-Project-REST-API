import UserModel from '../user/user.models.js';

export default class ProductModel{
    constructor(name, desc, imageUrl, category, price, sizes, id){
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    static add(product){
        product.id = products.length+1;
        products.push(product);
        return products;
    }

    static getAll(){
        return products;
    }

    static get(id){
        const product = products.find(i=> i.id==id);
        return product;
    }

    static filter(minPrice, maxPrice, category){
        const product = products.filter((product)=>{
            return(
                (!minPrice || product.price>=minPrice) &&
                (!maxPrice || product.price<=maxPrice) &&
                (!category || product.category == category)
            );
        });
        return product;
    }

    static rating(userId, productID, rating){
        const user = UserModel.getAll().find(i=>i.id == userId);
        
        if(!user){
            return "user is not present";
        }

        const product = products.find(p=> p.id == productID)
        if(!product){
            return "product is not present";
        }

        if(!product.rating){
            product.rating = [];
            product.rating.push({
                userId: userId,
                rating: rating
            })
        } else {
            const existingRating = product.rating.findIndex(i=> i.id == userId);
            if(existingRating >=0){
                product.rating[existingRating] = {
                    userId: userId,
                    rating: rating
                }
            }else{
                product.rating.push({
                    userId: userId,
                    rating: rating
                })
            }
        }
    }
    
}

let products = [
    new ProductModel(
        1,
        "Samsung Galaxy S24 Ultra",
        "This is a mobile phone",
        "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg",
        "Category1",
        122000
    ),
    new ProductModel(
        2,
        "Hoodie",
        "This is a Hoodie",
        "https://m.media-amazon.com/images/I/51iK4v1+pFL._AC_UY1100_.jpg",
        "Category2",
        1000,
        ['M', 'L']
    ),
    new ProductModel(
        3,
        "T-shirt",
        "This is a T-shirt",
        "https://entertainmentstore.in/cdn/shop/files/60824041762-min_c1d4f95c-3b60-4645-9d51-1f761090e1af.png?v=1736162632",
        "Category3",
        500,
        ['M', 'L', 'XL']
    )
]