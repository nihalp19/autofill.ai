import mongoose  from "mongoose";
import { boolean } from "zod";

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
        type : string,
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
        type : boolean,
    }
})


const USER = mongoose.model("users",userSchema)

export default USER