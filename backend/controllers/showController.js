//async -- to add promise based requests, to avoid try catches use express-async-handler.
const asyncHandler = require('express-async-handler')

const Show = require('../models/showModel')
const User = require('../models/userModel')

//@desc Get shows
//@route GET /api/shows
//@access PRIVATE
const getShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({user: req.user.id})

    res.status(200).json(shows)
})

//@desc Set a show
//@route POST /api/shows
//@access PRIVATE
const setShow = asyncHandler(async (req, res) => {
    //error handler -- no show name or ID
    if(!req.body.title){
        res.status(400)
        throw new Error('Please add a text field, representing the name or ID of the show.')
    }

    const show = await Show.create({
        title: req.body.title,
        poster: req.body.poster,
        user: req.user.id
    })

    res.status(200).json(show)
})

//@desc Update a show
//@route PUT /api/shows/:id
//@access PRIVATE
const updateShow = asyncHandler(async (req, res) => {
    const show = await Show.findById(req.params.id)
    
    if(!show){
        res.status(400)
        throw new Error('Show not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }
    //make sure the logged in user matches the owner of the show
    if(show.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }
    
    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedShow)
})

//@desc Delete a show
//@route DELETE /api/shows/:id
//@access PRIVATE
const deleteShow = asyncHandler(async (req, res) => {
    const show = await Show.findById(req.params.id)

    if(!show){
        res.status(400)
        throw new Error('Show not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }
    //make sure the logged in user matches the owner of the show
    if(show.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    await show.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getShows,
    setShow,
    updateShow,
    deleteShow
}