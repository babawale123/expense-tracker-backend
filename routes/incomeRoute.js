const express = require('express')
const { addIncome, getIncome,myIncome,updateIncome,getOneIncome,deleteIncome } = require('../controllers/incomeControllers')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

const router = express.Router()

router.route('/').post(verifyUser,addIncome)
router.route('/').get(verifyUser,myIncome)

router.route('/all').get(getIncome)

router.route('/:id').put(verifyUser,updateIncome)
router.route('/:id').get(getOneIncome)
router.route('/:id').delete(verifyUser,deleteIncome)



module.exports = router