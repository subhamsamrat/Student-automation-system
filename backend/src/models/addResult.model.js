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
     examDate:{
        type:Date,
        required:true
    },
     totalMark:{
        type:Number,
        required:true
    },
     stdResult:[
        {
           stdId:{
            type:String,
            required:true
           },
           securedMark:{
            type:Number,
            required:true
           } 
        }

     ]
},{timestamps:true})

export const resultSchema=mongoose.model('Results',addResultSchema);