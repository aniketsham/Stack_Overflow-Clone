import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    temp_token:{type:String},
    subscription:[{
        subscription_Id:String,
        subscription_Type:String,
        limit:Number,
    expiry_Date:{type:Date}}],
    user_device_details:[{
        deviceName:String,
        osName:String,
        osVersion:String,
        browserName:String,
        browserVersion:String,
        ipAddress:String,
        last_LogedIn:{type:Date,default:Date.now()}

    }],
    joinedOn:{type:Date,default:Date.now()},
})

export default mongoose.model("User",userSchema)