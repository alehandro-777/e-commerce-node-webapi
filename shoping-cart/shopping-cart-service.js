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

exports.addProduct = async (id, body) => {    
try{        //find cart
    const cartModel = await db.findById(ShoppingCart, {"_id": id});

    if (!cartModel) throw new Error("Cart doesn't exist");

        //find product in cart
        const line_index = cartModel.lines.findIndex( (line)=>{
            const match = body.product_id == line.product_id;
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
                product_id :  selected_product._id, 
                quantity: 1,
                price_one: selected_product.price,
                product_name: selected_product.name,
                product_descr: selected_product.descr,
                product_img_src : selected_product.image_uri
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

exports.removeProduct = (id, body) => {    
    //find cart
    return db.findById(ShoppingCart, {"_id": id}).then(
        (cartModel) => {
            if (!cartModel) return null;
            //find product in cart
            const line_index = cartModel.lines.findIndex( (line)=>{
                const match = body.product_id == line.product_id;

                return match;
            } );
            //product  exists in cart
            if (line_index > -1) {        
                cartModel.lines[line_index].quantity -= 1;
                //remove from cart

                if (cartModel.lines[line_index].quantity < 1) {

                    cartModel.lines = (cartModel.lines.length > 1) ? cartModel.lines.splice(line_index, 1) : []; 
                }
            } else {//product doesn't exist in cart
                throw new Error(`product doesn't exist in cart`);
            } 
            cartModel.calcTotal();                     
            cartModel.save((err)=> {
                if(err) throw err;                
            });
            return cartModel;
        }            
    );                      
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
