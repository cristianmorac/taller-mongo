const { Router } = require('express')
const users = require('./users.routes')
const products = require('./products.routes')

const router = Router();


router.get('/', users)
router.get('/', products)

// localhost:6000/users/
router.use('/users', users)
router.use('/products', products)


module.exports = router
