import express from 'express'
import RouterAuthentication from './routers/auth.route.js';
import { userRouter } from './routers/user.route.js';
import { movieRouter } from './routers/movie.route.js';

const rootRouter = express.Router()

rootRouter.use('/authentication', RouterAuthentication);
rootRouter.use('/users', userRouter)
rootRouter.use('/movies', movieRouter)

export { rootRouter }