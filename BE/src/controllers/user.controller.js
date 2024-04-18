import { UserModel } from "../models/user.model.js"
import { bcryptHasing } from "../utils/bcrypt.js"
import { generateToken } from "../utils/token.js"

const userController =
{
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const existedAccount = await UserModel.findOne({ email })
            if (existedAccount) throw new Error('Email existed')
            const hash = bcryptHasing.hashingPassword(password)
            const createdUser = await UserModel.create({
                username,
                email,
                password: hash.password,
                salt: hash.salt
            })
            res.status(201).json({
                data: createdUser,
                success: true
            })
        } catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const currentUser = await UserModel.findOne({ email })
            if (!currentUser) throw new Error('Wrong email or password')
            const checkPassword = bcryptHasing.verifyPassword(password, currentUser.password, currentUser.salt)
            if (!checkPassword) throw new Error('Wrong email or password')
            const getUser = { ...currentUser.toObject() }
            delete getUser.password
            delete getUser.salt
            const accessToken = generateToken({
                userId: getUser._id,
                email: getUser.email
            },
                'AT')
            const refreshToken = generateToken({
                userId: getUser._id,
                email: getUser.email
            },
                'RT')
            res.status(201).json({
                message: 'Login success',
                data: {
                    userInfo: getUser,
                    accessToken,
                    refreshToken
                },
                success: true
            })
        }
        catch (error) {
            res.status(401).json({
                message: error.message,
                success: false
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUser = await UserModel.findById(id, {
                password: 0,
                salt: 0
            });
            res.status(200).json({
                data: currentUser,
                message: 'Thành công!',
                success: true
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
    },
    updateUserInfo: async (req, res) => {
        const { id } = req.params
        const { username } = req.body
        // const avatar = req.file
        const user = req.user
        if (user.userId !== id) throw new Error(`Something is wrong`)
        await UserModel.findByIdAndUpdate(id, {
            username,
        })
        res.status(201).json({
            data: {
                username
            }
        })
    },
    updateUserPassword: async (req, res) => {
        try {
            const { id } = req.params
            const { password, newPassword } = req.body
            const user = req.user
            if (user.userId !== id) throw new Error(`Something is wrong`)
            const currentUser = await UserModel.findById(id)
            const checkPassword = bcryptHasing.verifyPassword(password, currentUser.password, currentUser.salt)
            if (!checkPassword) throw new Error('Password is not correct')
            const hash = bcryptHasing.hashingPassword(newPassword)
            await UserModel.findOneAndUpdate({ _id: id }, {
                password: hash.password,
                salt: hash.salt
            })
            res.status(201).json({ message: "Password change successful" })
        }
        catch (error) {
            res.status(403).json({ message: "Failed to update password" })
        }
    }
}
export { userController }