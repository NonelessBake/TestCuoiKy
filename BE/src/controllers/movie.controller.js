import { MovieModel } from "../models/movie.model.js"
import cloudinaryMovie from "../utils/cloudinary.js"
import pageSplit from "../utils/pageSplit.js"
import { v2 as cloudinary } from 'cloudinary'

const movieController = {
    getAllMovies: async (req, res) => {
        try {
            const { sortY, page, pageSize, keyword } = req.query
            const movies = await pageSplit(page, pageSize, MovieModel)
            if (!movies) throw new Error("Database is empty")
            if (sortY) {
                if (sortY === 'inc') {
                    movies.data.sort((a, b) => {
                        return a.year - b.year
                    })
                }
                else if (sortY === 'dec') {
                    movies.data.sort((a, b) => {
                        return b.year - a.year
                    })
                }
            }
            res.status(200).json({
                success: true,
                data: movies
            })
        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    },
    getMoviesByName: async (req, res) => {
        try {
            const { sortY, page, pageSize, keyword } = req.query

            if (!keyword) {
                const movies = await pageSplit(page, pageSize, MovieModel)
                res.status(200).json({
                    success: true,
                    movies
                })
            } else {
                const movies = await pageSplit(page, pageSize, MovieModel, { name: { $regex: keyword, $options: 'i' } })
                if (sortY) {
                    if (sortY === 'inc') {
                        movies.data.sort((a, b) => {
                            return a.year - b.year
                        })
                    }
                    else if (sortY === 'dec') {
                        movies.data.sort((a, b) => {
                            return b.year - a.year
                        })
                    }
                }
                res.status(200).json({
                    success: true,
                    data: movies
                })
            }

        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    },
    getMovieById: async (req, res) => {
        try {
            const { id } = req.params
            const currentMovie = await MovieModel.findById(id)
            if (!currentMovie) throw new Error("Can't find movie")
            res.status(200).json({
                data: currentMovie,
                success: true
            })
        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    }
    ,
    createMovie: async (req, res) => {
        try {
            const { name, time, year, introduce } = req.body
            const file = req.file
            const findFilm = await MovieModel.findOne({ name, time, year })
            if (findFilm) throw new Error("Movie is existed")
            if (!name || !time || !year) throw new Error('Missing field')
            if (!file) { return res.status(400).json({ error: 'No file upload' }) }
            const imageUrl = await cloudinaryMovie.createNewPathAndUrl(name, year, time, file)
            const createdMovie = await MovieModel.create({
                name,
                time,
                year,
                introduce,
                image: imageUrl
            })
            console.log(3);

            res.status(201).json({
                data: createdMovie,
                success: true
            })
        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    },
    updateMovieById: async (req, res) => {
        try {
            const { id } = req.params
            const currentMovie = await MovieModel.findById(id)
            if (!currentMovie) throw new Error("Film is not found")
            const { name, introduce, year, time } = req.body
            if (!name || !year || !time) throw new Error("Missing field")
            const file = req.file
            if (!file) throw new Error("Image is missing")
            console.log(1);
            await cloudinaryMovie.deleteOldPathAndUrl(currentMovie.name, currentMovie.year, currentMovie.time)
            console.log(2);
            const imageUrl = await cloudinaryMovie.createNewPathAndUrl(name, year, time, file)
            currentMovie.name = name
            if (introduce.length > 0) { currentMovie.introduce = introduce }
            currentMovie.time = time
            currentMovie.year = year
            currentMovie.image = imageUrl
            await currentMovie.save()
            res.status(203).json({
                success: true,
                data: currentMovie
            })

        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    },
    deleteMovieById: async (req, res) => {
        try {
            const { id } = req.params
            const currentMovie = await MovieModel.findById(id)
            if (!currentMovie) throw new Error("Movie is not found")
            const isDeleted = await cloudinaryMovie.deleteOldPathAndUrl(currentMovie.name, currentMovie.year, currentMovie.time)
            if (isDeleted) {
                await MovieModel.deleteOne(currentMovie)
                res.status(201).json({
                    success: true,
                    message: "Move is deleted"
                })
            }
            else {
                throw new Error("Can't delete this movie")
            }
        }
        catch (err) {
            res.status(404).json({
                message: err.message,
                success: false
            })
        }
    }
}
export default movieController