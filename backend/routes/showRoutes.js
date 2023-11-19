const express = require('express')
const router = express.Router()
const {getShows, setShow, updateShow, deleteShow} = require('../controllers/showController')

router.route('/').get(getShows).post(setShow)
router.route('/:id').put(updateShow).delete(deleteShow)
/**
 * above two lines replaces these 4 routes:
 * router.get('/', getShows)
 * router.post('/', setShow)
 * router.put('/:id', updateShow)
 * router.delete('/:id', deleteShow)
 * 
 */




module.exports = router