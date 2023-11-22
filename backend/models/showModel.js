const mongoose = require('mongoose')
const showSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    poster: {
        type: String,
        required: false
    }
},
{
    timestamps: true,
}
)

module.exports= mongoose.model('Shows', showSchema)