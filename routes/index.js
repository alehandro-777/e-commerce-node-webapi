const express = require('express')
const user_controller = require('../controllers/user-controller')
const product_controller = require('../controllers/product-controller')
const product_cats_controller = require('../controllers/product-category-controller')
const product_imgs_controller = require('../controllers/product-image-controller')

const router = express.Router()
const authorize = require('./auth')


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Incoming request Time: ', Date.now())
  next()
})


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

router.post('/products/:id/image',  product_imgs_controller.uploadProductImage )
router.post('/products/:id/images',  product_imgs_controller.uploadProductImages )
router.delete('/products/images/:id', product_imgs_controller.deleteOneImage);
router.get('/products/:id/image', product_imgs_controller.findOneProductImage);

router.post('/product-cats',      product_cats_controller.postProductCategory )
router.get('/product-cats',       product_cats_controller.selectProductCategories )
router.delete('/product-cats/:id', product_cats_controller.deleteProductCategory )
router.put('/product-cats/:id',    product_cats_controller.updateProductCategory )
router.get('/product-cats/:id',    product_cats_controller.findOneProductCategory )

//router.get('/products/:id/images',  product_controller.xxxx )
//router.get('/products/:id/images/:img_id',  product_controller.xxxx )
//app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
//})
 
//app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
//})


module.exports =  router 