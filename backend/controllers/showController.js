//async -- to add promise based requests, to avoid try catches use express-async-handler.
const asyncHandler = require('express-async-handler')

//@desc Get shows
//@route GET /api/shows
//@access PRIVATE
const getShows = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get Shows.'})
})

//@desc Set a show
//@route POST /api/shows
//@access PRIVATE
const setShow = asyncHandler(async (req, res) => {
    //error handler -- no show name or ID
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field, representing the name or ID of the show.')
    }
    res.status(200).json({message: 'Add a Show'})
})

//@desc Update a show
//@route PUT /api/shows/:id
//@access PRIVATE
const updateShow = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update Show ${req.params.id}`})
})

//@desc Delete a show
//@route DELETE /api/shows/:id
//@access PRIVATE
const deleteShow = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Show ${req.params.id}`})
})

module.exports = {
    getShows,
    setShow,
    updateShow,
    deleteShow
}