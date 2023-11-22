const express = require('express')
const router = express.Router()
const {getShows, setShow, updateShow, deleteShow} = require('../controllers/showController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getShows).post(protect, setShow)
router.route('/:id').put(protect, updateShow).delete(protect, deleteShow)
/**
 * above two lines replaces these 4 routes:
 * router.get('/', getShows)
 * router.post('/', setShow)
 * router.put('/:id', updateShow)
 * router.delete('/:id', deleteShow)
 * 
 */




module.exports = router