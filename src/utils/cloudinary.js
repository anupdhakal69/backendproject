import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (localfilepath) => {
    try {
        if(!localfilepath) return null     
        //upload to cloudinary
        const response = await cloudinary.uploader.upload(localfilepath,{resource_type: "auto"})   
        console.log("File uploaded to cloudinary",response.url);
        return response
    } 
    catch (error) {
        fs.unlinkSync(localfilepath) //delete the locally saved temporary file
    }

}

export {uploadToCloudinary}