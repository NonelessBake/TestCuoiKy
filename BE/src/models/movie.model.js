import mongoose from 'mongoose'
import Collections from '../database/collection.js'

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        default: "Đây là một bộ phim hay"
    }

},
    {
        timestamps: true
    })
const MovieModel = mongoose.model(Collections.MOVIES, movieSchema)
export { MovieModel }