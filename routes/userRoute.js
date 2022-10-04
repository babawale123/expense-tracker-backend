const express = require('express')
<<<<<<< HEAD
const {Register, Login} = require('../controllers/userController')

const router = express.Router()

router.route('/').post(Register)
router.route('/login').post(Login)
=======
const { register, login } = require('../controllers/userController')

const router = express.Router()

router.route('/').post(register)
router.route('/login').post(login)

>>>>>>> 3bc12cc ('yy')

module.exports = router