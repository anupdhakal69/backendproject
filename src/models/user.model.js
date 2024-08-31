import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        index: true
    },
    avatar:{
        type: String,  //cloudinary url
        required: true,
    },
    coverImage:{
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken:{
        type: String
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
    
},{timestamps: true})


UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
   return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
)
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
)    
}


export const User = mongoose.model("User", UserSchema)