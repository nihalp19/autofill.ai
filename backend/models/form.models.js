import mongoose from "mongoose"


const formSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true,
    },
    form: [
        {
            question: {
                type: String,
            },
            type: {
                type: String,
            },
            options: [],
            answer: {
                type: String
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

}, { timestamps: true })


const FORM = mongoose.model('forms', formSchema)

export default FORM


