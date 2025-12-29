import mongoose from "mongoose";

const addResultSchema=new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
     year:{
        type:String,
        required:true
    },
     examName:{
        type:String,
        required:true
    },
     ExamDate:{
        type:Date,
        required:true
    },
     fullMark:{
        type:Number,
        required:true
    },
     stdResult:[
        {
           stdId:{
            type:String,
            required:true
           },
           mark:{
            type:Number,
            required:true
           } 
        }

     ]
},{timestamps:true})

export const resultSchema=mongoose.model('Results',addResultSchema);