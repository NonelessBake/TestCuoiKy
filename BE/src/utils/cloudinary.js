import { CLOUD_CONFIG } from "../configs/cloudinary.config.js"
import { v2 as cloudinary } from 'cloudinary'

const basePath = CLOUD_CONFIG.BASE_ASSET
const cloudinaryMovie = {
    deleteOldPathAndUrl: async (name, year, time) => {
        try {
            const currentFolderPath = `${basePath}/${name}-${year}-${time}`;
            const findCurrentFolder = await cloudinary.api.delete_resources_by_prefix(currentFolderPath,
                { resource_type: 'image' })
            console.log(findCurrentFolder);
            if (!findCurrentFolder) throw new Error('Cloud image folder not found')
            await cloudinary.api.delete_folder(currentFolderPath);
        }
        catch (err) {
            throw new Error(err.message)

        }

    },
    createNewPathAndUrl: async (name, year, time, file) => {
        try {
            const newFolderPath = `${basePath}/${name}-${year}-${time}`
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
            const fileName = `${name.replace(' ', '-')}-${year}`
            await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName,
                resource_type: 'auto',
                folder: newFolderPath
            })
            const image = await cloudinary.api.resources({
                type: 'upload',
                prefix: newFolderPath
            })
            if (!image.resources) throw new Error("Can't find image on cloud")

            const imageUrl = image.resources[0].secure_url
            return imageUrl
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}
export default cloudinaryMovie