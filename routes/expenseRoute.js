const express = require('express')
const { addExpense, getExpense,myExpense,updateExpense,getOneExpense,deleteExpense } = require('../controllers/ExpenseControllers')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

const router = express.Router()

router.route('/').post(verifyUser,addExpense)
router.route('/').get(verifyUser,myExpense)

router.route('/all').get(getExpense)

router.route('/:id').put(verifyUser,updateExpense)
router.route('/:id').get(getOneExpense)
router.route('/:id').delete(verifyUser,deleteExpense)



module.exports = router