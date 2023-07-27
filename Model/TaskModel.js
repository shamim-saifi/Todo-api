import mongoose from "mongoose";


const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});
export const Task=mongoose.model('task',TaskSchema);

