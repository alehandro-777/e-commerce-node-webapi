const express = require('express')
const user_controller = require('../user/user-controller')
const product_controller = require('../product/product-controller')
const product_cats_controller = require('../product-cat/product-category-controller')
const imgs_controller = require('../upload/upload-controller')
const shop_cart_controller = require('../shoping-cart/shopping-cart-controller')

const router = express.Router()
const authorize = require('./auth')


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Incoming request Time: ', Date.now())
  next()
})

router.get('/', express.static(__dirname ));

router.post('/login', user_controller.login )

router.post('/users',      user_controller.postUser )
router.get('/users',       user_controller.selectUsers )
router.delete('/users/:id', user_controller.deleteUser )
router.put('/users/:id',    user_controller.updateUser )
router.get('/users/:id',    user_controller.findOneUser )

router.post('/products',      product_controller.postProduct )
router.get('/products',       product_controller.selectProducts )
router.delete('/products/:id', product_controller.deleteProduct )
router.put('/products/:id',    product_controller.updateProduct )
router.get('/products/:id',    product_controller.findOneProduct )

router.post('/image',  imgs_controller.uploadImage )
router.post('/images',  imgs_controller.uploadManyImages )
router.delete('/images/:id', imgs_controller.deleteOneImage);
//router.get('/images/:id', product_imgs_controller.findOneImage);
router.get('/images', imgs_controller.selectImages);


router.post('/product-cats',      product_cats_controller.postProductCategory )
router.get('/product-cats',       product_cats_controller.selectProductCategories )
router.delete('/product-cats/:id', product_cats_controller.deleteProductCategory )
router.put('/product-cats/:id',    product_cats_controller.updateProductCategory )
router.get('/product-cats/:id',    product_cats_controller.findOneProductCategory )

router.post('/users/:id/cart',    shop_cart_controller.addProductToCart )
router.delete('/users/:id/cart',  shop_cart_controller.removeProductFromCart )

router.post('/shopcarts',    shop_cart_controller.create )
router.get('/shopcarts',    shop_cart_controller.selectPage )

module.exports =  router 