import bcrypt from 'bcrypt'
const bcryptHasing = {
    hashingPassword: (password) => {
        const salt = bcrypt.genSaltSync(6);
        const hashPassword = bcrypt.hashSync(password, salt);
        return {
            password: hashPassword,
            salt
        }
    },
    verifyPassword: (password, hashPassword, salt) => {
        const hashingPassword = bcrypt.hashSync(password, salt)
        return hashPassword === hashingPassword
    }
}
export { bcryptHasing }