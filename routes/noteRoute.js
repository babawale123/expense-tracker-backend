const express = require("express")
const { create, getNote, getOneNote, updateNote, deleteNote  } = require("../controllers/noteController")
const { protect } = require("../middleware/verify")

const router = express.Router()

router.route('/').post(protect,create)
router.route('/').get(protect,getNote)
router.route('/:id').get(getOneNote).put(protect,updateNote).delete(protect,deleteNote)


module.exports = router