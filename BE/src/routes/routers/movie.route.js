import movieController from "../../controllers/movie.controller.js";
import authorization from "../../middlewares/author.middleware.js";
import { middleware } from "../../middlewares/middleware.js";
import { memoryUploader } from "../../middlewares/uploader.middleware.js";
import express from 'express'

// middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyAdmin,

const movieRouter = express.Router()
movieRouter.get('/', movieController.getAllMovies)
movieRouter.get('/search', movieController.getMoviesByName)
movieRouter.get('/movie/:id', movieController.getMovieById)
movieRouter.post('/', memoryUploader.single('file'), movieController.createMovie)
movieRouter.put('/:id', memoryUploader.single('file'), movieController.updateMovieById)
movieRouter.delete('/:id', memoryUploader.single('file'), movieController.deleteMovieById)
export { movieRouter }