const { Router } = require('express')
const users = require('./users.routes')

const router = Router();


router.get('/', users)

// localhost:6000/users/
router.use('/users', users)


module.exports = router
