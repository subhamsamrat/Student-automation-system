import mongoose from 'mongoose'

const attendanceSchema=new mongoose.Schema({
          date:{
            type:String,
            required:true,
          },
          department:{
            type:String,
            required:true,
          },
          year:{
            type:String,
            required:true
          },
           attendance:[
           {
            stdId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'student',
              required:true
            },
            status:{
              type:Boolean,
              required:true
            }
           }
          ],
},{timestamps:true})

export const AttendanceSchema=mongoose.model('takeattendance',attendanceSchema);