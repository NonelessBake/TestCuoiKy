import { userController } from "../../controllers/user.controller.js";
import { middleware } from "../../middlewares/middleware.js";
import { memoryUploader } from "../../middlewares/uploader.middleware.js";
import express from 'express'

const userRouter = express.Router()
userRouter.post('/register', middleware.validateSignup, userController.register)
userRouter.post('/login', middleware.validateSignin, userController.login)
userRouter.get('/:id', userController.getUser)
userRouter.put('/:id/information', middleware.verifyAccessToken, memoryUploader.single('file'), userController.updateUserInfo)
userRouter.put('/:id/password', middleware.verifyAccessToken, memoryUploader.single('file'), userController.updateUserPassword)
export { userRouter }