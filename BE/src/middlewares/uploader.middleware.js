import multer from 'multer'

const memoryStorage = multer.memoryStorage()
const memoryUploader = multer({ storage: memoryStorage })

export { memoryUploader }   