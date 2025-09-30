import mongoose from 'mongoose';

const accountSchem=new mongoose.Schema({

    stdId:{
        type:String,
        required:true
    },
    studentName:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true,
    },
      totalAmount:{
        type:Number,
        required:true
    },
      remainAmount:{
        type:Number,
        required:true
    },
      totalDipositAmount:{
        type:Number,
        required:true
    },
    history:[
        {
             paymentId:{
        type:String,
        required:true
    },
            amount:{
                type:String,
                required:true
            },
            payMode:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                required:true
            }
        }
    ]

},{timestamps:true});

export const paymentSchema=mongoose.model('payment',accountSchem);