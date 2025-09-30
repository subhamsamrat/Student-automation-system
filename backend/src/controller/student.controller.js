import studentSchema from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import signupSchema from "../models/stdSignup.model.js";
import { AttendanceSchema } from "../models/takeAttendance.model.js";
import { resultSchema } from "../models/addResult.model.js";  
import { paymentSchema } from "../models/payment.model.js";

//view student
export const students = async (req, res) => {
  try {
    const data = await studentSchema.find();

    if (!data) {
      console.log("No data found");
      res.status(404).json("student data not found");
    } else {
      console.log("data fetch succesfully");
      res.status(200).json(data);
    }
  } catch (error) {
    console.log("ERROR !! in student controller:", error);
    res.status(500).json("internal server error", error);
  }
};

//student signup
export const studentSignup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (!email || !password || !confirmPassword) {
      console.log("ERROR !! require data not found");
      return res.status(404).json({ error: "required data not found" });
    }

    const isExist1 = await studentSchema.findOne({ email });
    if (isExist1) {
      const isExist2 = await signupSchema.findOne({ email });
      if (isExist2) {
        console.log(
          `ERROR !! user with email ${email} aleardy exist pleas Login`
        );
        return res.status(401).json({
          error: `user with email ${email} aleardy exist pleas Login`,
        });
      }

      if (password !== confirmPassword) {
        console.log("ERROR !! password & confirmPassword must be same");
        return res
          .status(406)
          .json({ error: "password confirmPassword must be same" });
      }

      const hasePassword = await bcrypt.hash(password, 10);
      console.log("hashed");

      const newStd = new signupSchema({
        email,
        password: hasePassword,
      });
      console.log("data wraped");

      const response = await newStd.save();
      console.log("response:", response);

      console.log("Signup succesfully");
      return res.status(200).json({ message: "signup successfully" });
    } else {
      console.log("You are not validate this time");
      return res.status(401).json({ error: "You are not validate this time" });
    }
  } catch (error) {
    console.log("ERROR !! in student signup", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//student login
export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("pleas provid email and password");
      return res.status(404).json({ error: "pleas provid email and password" });
    }

    const user = await studentSchema.findOne({ email });
    if (user) {
      const isExist = await signupSchema.findOne({ email });
      if (!isExist) {
        console.log("ERROR !! user not exist please Signup");
        return res.status(404).json({ error: "user not exist please Signup" });
      }
      const isVerify = await bcrypt.compare(password, isExist.password);
      if (!isExist || isExist === null || !isVerify) {
        console.log("ERROR !! invalid crediential");
        return res.status(400).json({ error: "invalid cradential" });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
          },
          config.JWT_USER_SECRET,
          { expiresIn: "1d" }
        );

        const cookieOptions = {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1d
          httpOnly: true, // its true for secure purpose because(this cookie can't accesable directly thgrow js)
          secure: process.env.NODE_ENV === "production", //true for http only
          domain: "localhost",
          path: "/",
          sameSite: "strict", //privent CSRF attacks
        };
        res.cookie("jwt", token, cookieOptions);
        return res
          .status(201)
          .json({ message: "Login succesfilly", user, token });
      }
    } else {
      console.log("You are not validate this time");
      return res.status(401).json({ error: "You are not validate this time" });
    }
  } catch (error) {
    console.log("ERROR !! in student Login", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//student attendance
export const attendance = async (req, res) => {
  try {
    const studentId = req.studentId;
    const user = await studentSchema.findById(studentId);

    // Fetch all students of same dept/year
    const allStudents = await studentSchema.find({
      year: user.year,
      department: user.department,
    });

    // Fetch attendance records of that dept/year
    const response = await AttendanceSchema.find({
      year: user.year,
      department: user.department,
    });

    const months = [
      "january","february","march","april","may","june",
      "july","august","september","october","november","december"
    ];

    // 1) Logged-in student stats
    const myStats = months.map(m => ({ name: m, present: 0, absent: 0 }));

    response.forEach((record) => {
      const month = record.date.getMonth();
      record.attendance.forEach((att) => {
        if (att.stdId.equals(studentId)) {
          if (att.status === true) {
            myStats[month].present += 1;
          } else {
            myStats[month].absent += 1;
          }
        }
      });
    });

    // 2) All students yearly percentage
    const allStudentsStats = [];

    for (const student of allStudents) {
      let present = 0;
      let absent = 0;

      response.forEach((record) => {
        record.attendance.forEach((att) => {
          if (att.stdId.equals(student._id)) {
            if (att.status === true) {
              present += 1;
            } else {
              absent += 1;
            }
          }
        });
      });

      const total = present + absent;
      const percentage = total > 0 ? (present / total) * 100 : 0;

      allStudentsStats.push({
        rollNo: student.rollNo,
        studentName: student.studentName,
        image: student.image.url,        // make sure schema has image field
        percentage: percentage.toFixed(2),
      });
    }

    // 3) Highest 3 students
    const top3 = [...allStudentsStats]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)
      .map(s => ({
        studentName: s.studentName,
        image: s.image,
        percentage: s.percentage,
      })); 

    // Final response
    return res.status(200).json({
      message: "Data processed successfully",
      myStats,          // logged-in student monthly stats 
      allStudentsStats, // yearly percentage of each student
      top3Students: top3, // highest 3 students with name + image
    });

  } catch (error) {
    console.log("ERROR !! in student attendance", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//student result
export const result= async(req,res)=>{
    const studentId=req.studentId;
      try {
        const allresults=await resultSchema.find();   
        const student=await studentSchema.findById(studentId);

        if(!student){
          console.log('ERROR !! in student result controller student not found');
          return res.status(404).json({error:'student not found'});
        }
      const stdresult=allresults.filter((e)=> e.department===student.department && e.year===student.year);
        if(!stdresult || stdresult.length===0 || stdresult===null){
          console.log('ERROR !! in student result controller no result found');
          return res.status(404).json({error:'No result published'});
        }

        console.log('result fetch successfully',stdresult); 
        return res.status(200).json({message:'result fetch successfully',stdresult});
      } catch (error) {
        console.log("ERROR !! in student result controller:",error);
        return res.status(500).json({error:'internal server error'});
      }
};

//student account 
export const account=async (req,res)=>{
   const studentId=req.studentId;
   try {
    //get login student data
    const student=await studentSchema.findById(studentId);
    if(!student || student===null){
      console.log('ERROR !! in student controller student not found');
      return res.status(404).json({error:'student not found'});
    }
    //get payment data
    const paymentData=await paymentSchema.find({stdId:studentId});
    if(!paymentData){
      console.log('No payment initiate');
      return res.status(404).json({message:'No payment initiate'})
    }
       console.log('payment data fetch successfully',paymentData);
    return res.status(200).json({message:'payment data fetch successfully',paymentData})
   } catch (error) {
    console.log('ERROR !! in student account controller');
    return res.status(500).json({error:'internal server error'});
   }
};