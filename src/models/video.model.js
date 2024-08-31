import mongoose from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required']
    },
    videoFile: {
        type: String,
        required: [true, 'VideoFile is required']
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true   
    },    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})


VideoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model('Video', VideoSchema)