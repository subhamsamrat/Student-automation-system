import mongoose, { Schema } from 'mongoose'

const attendanceSchema=new mongoose.Schema({
          id:{
            type:Schema.Types.ObjectId,
            ref:'student',
            require:true,
          },
          status:{
            type:Boolean,
            require:true,
            enum:['true','false'],
            default:'false'         
          },
          date:{
            type:Date,
            require:true,
          },
          department:{
            trpe:Schema.Types.ObjectId,
            ref:"student",
            require:true,
          }
})

export const attendance=mongoose.model('takeAttendance',attendanceSchema);