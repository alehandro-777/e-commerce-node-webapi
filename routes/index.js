var express = require('express')
var controllers = require('../controllers')
var router = express.Router()
const authorize = require('./auth')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.post('/login', controllers.login )

router.post('/', controllers.postUser )
router.get('/', authorize(), controllers.selectUsers )
router.delete('/:id', controllers.deleteUser )
router.put('/:id', controllers.updateUser )
router.get('/:id', controllers.findOneUser )

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports =  router 