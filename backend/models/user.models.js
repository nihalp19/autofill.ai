import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    roles : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    collegeName : {
        type : String,
    },
    Collegedegree : {
        type : String
    },
    graduation : {
        type : Boolean,
    }
})


const USER =  mongoose.model("users",userSchema)

export default USER