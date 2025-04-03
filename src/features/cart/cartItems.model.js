export default class CartItemModel{
    constructor( productId, userId, quantity, id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this._id = id;
    }

    static add(productId, userId, quantity){
        const cart = new CartItemModel(productId, userId, quantity);
        cart.id = carts.length+1;
        carts.push(cart);
        return carts;
    }

    static getCarts(userId){
        const cart = carts.filter(i=> i.userId == userId);
        return cart;
    }

    static deleteCarts(cartId, userId){
        const cardIndex = carts.findIndex(i=> i.id == cartId && i.userId == userId);
        if(cardIndex < 0){
            return "cart is not present";
        } else{
            carts.splice(cardIndex, 1);
        }
    }
   
}

let carts = [
    new CartItemModel(1, 1, 2, 1),
]