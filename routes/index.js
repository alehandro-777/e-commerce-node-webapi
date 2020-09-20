const express = require('express')

const user_controller = require('../user/user-controller')
const product_controller = require('../product/product-controller')
const product_cats_controller = require('../product-cat/product-category-controller')
const imgs_controller = require('../upload/upload-controller')
const shop_cart_controller = require('../shoping-cart/shopping-cart-controller')
const cfg_forms_controller = require('../forms/forms-controller')
const form_data_controller = require('../forms/forms-data-controller')

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


router.post('/categories',      product_cats_controller.postProductCategory )
router.get('/categories',       product_cats_controller.selectProductCategories )
router.delete('/categories/:id', product_cats_controller.deleteProductCategory )
router.patch('/categories/:id',    product_cats_controller.updateProductCategory )
router.get('/categories/:id',    product_cats_controller.findOneProductCategory )


router.post('/shopcarts/:id/lines',    shop_cart_controller.addProduct )
router.delete('/shopcarts/:id/lines/:line_id',  shop_cart_controller.removeLine )
router.delete('/shopcarts/:id/lines',  shop_cart_controller.removeAll )
router.patch('/shopcarts/:id/lines/:line_id',  shop_cart_controller.changeLine )
router.post('/shopcarts',    shop_cart_controller.create )
router.get('/shopcarts',    shop_cart_controller.selectPage )
router.get('/shopcarts/:id',    shop_cart_controller.findById )

router.post('/forms',      cfg_forms_controller.create )
router.get('/forms',       cfg_forms_controller.select )
router.delete('/forms/:id', cfg_forms_controller.delete )
router.patch('/forms/:id',    cfg_forms_controller.update )
router.get('/forms/:id',    cfg_forms_controller.findOne )


router.post('/formvalues',      form_data_controller.create )
router.get('/formvalues',       form_data_controller.select )
router.delete('/formvalues/:id', form_data_controller.delete )
router.patch('/formvalues/:id',    form_data_controller.update )
router.get('/formvalues/:id',    form_data_controller.findOne )


module.exports =  router 