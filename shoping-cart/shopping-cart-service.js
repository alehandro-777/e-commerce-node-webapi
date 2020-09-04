const db = require('../db');
const ShoppingCart = require('./shopping-cart-model');
const Product = require('../product/product-model')
const base = require('../shared')

exports.findById = (id) => {       
    return db.findById(ShoppingCart, {"_id": id});
}

exports.createNewCart = (body) => {
      
    const new_Instance = new ShoppingCart(body);

    return db.create(new_Instance);
}

exports.deleteCart = (id) => {       
    return db.deleteOne(ShoppingCart, {"_id": id});
}

exports.clear = (id) => {       
    return db.deleteOne(ShoppingCart, {"_id": id});
}

exports.getPageOfItems = async  (query) => {
    return await base.getPageOfDocs(ShoppingCart, query);
}

//POST id - shoping cart { "product_id": "5f51ea5dc4fb441d4c85739e" }
exports.addProduct = async (id, body) => {    
try{        //find cart
    const cartModel = await db.findById(ShoppingCart, {"_id": id}).populate('lines.product');

    if (!cartModel) throw new Error("Cart doesn't exist");
    
    console.log(cartModel)  

        //find product in cart
        const line_index = cartModel.lines.findIndex( (line)=>{            
                const match = body.product_id == line.product._id;
                return match;
            });

        //product  exists in cart - increment counter
        if (line_index > -1) { 

            cartModel.lines[line_index].quantity += 1;

            cartModel.calcTotal();

        } else {//product doesn't exist in cart add new line to cart

            const selected_product = await db.findById(Product, {"_id": body.product_id});

            if (!selected_product) throw new Error("Product doesn't exist");

            const new_line = { 
                product :  selected_product,
                quantity :  parseInt(body.quantity) || 1
            };
            
            cartModel.lines.push(new_line);
            cartModel.calcTotal();
        }                      
        await cartModel.save();
        return cartModel; 
    }
    catch(err)
    {
        throw err;
    }            
}

//'/shopcarts/:id/lines/:line_id'
//PATCH id - shoping cart { "quantity" : 10 }
exports.changeProductQuantity = async (id, line_id, body) => {    
    try{        //find cart
        const cartModel = await db.findById(ShoppingCart, {"_id": id}).populate('lines.product');
    
        if (!cartModel) throw new Error("Cart doesn't exist");
    
        console.log(cartModel)
            //find product in cart
            const line_index = cartModel.lines.findIndex( (line) => {
                const match = line_id == line._id;
                return match;
                });
            
            //product  exists in cart - increment counter
            if (line_index > -1) { 
    
                cartModel.lines[line_index].quantity = parseInt(body.quantity);
                cartModel.calcTotal();
    
            } else {//product doesn't exist in cart add new line to cart
                throw new Error('product doesn exist in cart' );
            }                      
            await cartModel.save();
            return cartModel; 
        }
        catch(err)
        {
            throw err;
        }            
}
//'/shopcarts/:id/lines/:line_id'
//DELETE id - shoping cart {  }
exports.removeLine = async (id, line_id) => {    
    try{        //find cart
        const cartModel = await db.findById(ShoppingCart, {"_id": id}).populate('lines.product');
    
        if (!cartModel) throw new Error("Cart doesn't exist");
    
            //find line in cart
            const line_index = cartModel.lines.findIndex( (line)=>{
                const match = line_id == line._id;
                return match;
                });
            //line  exists in cart - remove line
            if (line_index > -1) { 

            cartModel.lines = (cartModel.lines.length > 1) ? cartModel.lines.splice(line_index, 1) : []; 
            cartModel.calcTotal();
    
            } else {//product line doesn't exist in cart 
                throw new Error('product doesn exist in cart' );
            }                      
            await cartModel.save();
            return cartModel; 
        }
        catch(err)
        {
            throw err;
        }            
}

exports.removeAll = (id) => {    
    //find cart
    return db.findById(ShoppingCart, {"_id": id}).then(
        (cartModel) => {
            if (!cartModel) return null;
            cartModel.lines = [];
            cartModel.save((err)=> {
                if(err) throw err;                
            });
            return cartModel;
        }            
    );                      
}
