import loginAdmin from "../models/admin_login.model.js";
import StudentSchema from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { v2 as cloudinary } from "cloudinary";
import { AttendanceSchema } from "../models/takeAttendance.model.js";
import { resultSchema } from "../models/addResult.model.js";
import { paymentSchema } from "../models/payment.model.js";
import { response } from "express";

//admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("❌ERROR !! in admin login: missing required fields");
      return res.status(404).json({ error: "❌all field are required" });
    }

    const existAdmin = await loginAdmin.findOne({ email });
    if (!existAdmin) {
      console.log("❌ERROR !! admin with email not exist");
      return res.status(404).json({ error: "❌Wrong cradential" });
    }

    const token = jwt.sign(
      {
        id: existAdmin._id,
      },
      config.JWT_ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    console.log('password=',password,'back pass=',existAdmin.password);
    

     const compPassword = bcrypt.compare(password, existAdmin.password);
    if (compPassword) {
      res.cookie("jwt", token, cookieOption);
       console.log("Login successfully ✅", existAdmin);
      return res
        .status(201)
        .json({ message: "Login Successfully ✅ ", token, existAdmin });
    }
  } catch (error) {
    console.log("❌Error !! in admin login:", error);
    res.status(500).json({ error: "Internal server error❌" });
  }
};

//add student  (admin)
export const addStudent = async (req, res) => {
  const {
    studentName,
    rollNo,
    DOB,
    gender,
    parentName,
    parentPhoneNo,
    country,
    state,
    city,
    zipCode,
    email,
    phoneNo,
    department,
    year,
  } = req.body;

  const { image } = req.files;

  try {
    if (
      !studentName ||
      !rollNo ||
      !DOB ||
      !gender ||
      !parentName ||
      !parentPhoneNo ||
      !country ||
      !state ||
      !city ||
      !zipCode ||
      !email ||
      !phoneNo ||
      !department ||
      !year
    ) {
      console.log(
        "❌ERROR !! in addStudent controller: Missing required fields"
      );
      return res.status(400).json({ error: "❌All fields are required" });
    }

    if (phoneNo.length && phoneNo.length !== 10) {
      console.log("❌ERROR !! in addStudent controller: Invalid phone number");
      return res.status(400).json({ error: "❌Invalid phone number" });
    }

    if (!image || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "invalid file format. Only JPG & PNG allowed" });
    }

    //cloudinary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ error: "ERROR !! in uploading file to cloudinary" });
    }

    const existStudent = await StudentSchema.findOne({ email });

    if (existStudent) {
      console.log(
        "❌ERROR !! student with email aleardy exists:",
        existStudent.email
      );
      return res.status(400).json({
        error: "❌ Student with this email already exists:",
        email: existStudent.email,
      });
    }

    const newStudent = new StudentSchema({
      studentName,
      rollNo,
      DOB,
      gender,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      parentName,
      parentPhoneNo,
      country,
      state,
      city,
      zipCode,
      email,
      phoneNo,
      department,
      year,
    });

    const response = await newStudent.save();
    console.log("Student registered successfully ✅ ", newStudent);
    res
      .status(201)
      .json({ message: "Student added successfully ✅ ", response });
  } catch (error) {
    console.log("❌ERROR !! in addStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//adminview all students
export const adminViewAllStudents = async (req, res) => {
  const { department, year } = req.query;

  try {
    if (!department || !year) {
      console.log(
        "❌ERROR !! in adminViewAllStudents controller: Missing required query parameters"
      );
      return res
        .status(400)
        .json({ error: "department and year are required" });
    }
    console.log({ department, year });

    const students = await StudentSchema.find({ department, year });
    console.log("Students found:", students);
    if (students.length === 0) {
      console.log("❌ERROR !! No students found");
      return res.status(404).json({ error: "No students found" });
    }
    console.log("Students retrieved successfully ✅", students);
    res.status(200).json({ students });

    // const data = await StudentSchema.find();

    // if (!data) {
    //   console.log("No data found");
    //   res.status(404).json("student data not found");
    // } else {
    //   console.log("data fetch succesfully");
    //   res.status(200).json(data);
    // }
  } catch (error) {
    console.log("❌ERROR !! in adminViewAllStudents controller:", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//admin update student
export const UpdateStudent = async (req, res) => {
  const { studentId } = req.params;
  const {
    studentName,
    rollNo,
    DOB,
    gender,
    parentName,
    parentPhoneNo,
    country,
    state,
    city,
    zipCode,
    email,
    phoneNo,
    department,
    year,
  } = req.body;
  //const { image } = req.files;

  try {
    // if (!studentName || !rollNo || !DOB || !gender || !parentName || !parentPhoneNo || !country || !state || !city || !zipCode || !email || !phoneNo || !department || !year) {
    //   console.log('❌ERROR !! in UpdateStudent controller: Missing required fields');
    //   return res.status(400).json({ error: "❌All fields are required" });
    // }

    // if (phoneNo.length && phoneNo.length !== 10) {
    //   console.log('❌ERROR !! in UpdateStudent controller: Invalid phone number');
    //   return res.status(400).json({ error: "❌Invalid phone number" });
    // }

    // if (!image || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }

    // const allowedFormat = ['image/png', 'image/jpeg'];
    // if (!allowedFormat.includes(image.mimetype)) {
    //   return res.status(400).json({ error: 'invalid file format. Only JPG & PNG allowed' });
    // }

    //cloudinary code
    // const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    // if (!cloud_response || cloud_response.error) {
    //   return res.status(400).json({ error: 'ERROR !! in uploading file to cloudinary' });
    // }

    const existStudent = await StudentSchema.findById({ _id: studentId });
    if (!existStudent) {
      console.log("❌ERROR !! student not detail found");
      return res.status(404).json({ error: "Student not detail found" });
    }

    const updatedStudent = await StudentSchema.findByIdAndUpdate(
      existStudent._id,
      {
        studentName,
        rollNo,
        DOB,
        gender,
        // image: {
        //   public_id: cloud_response.public_id,
        //   url: cloud_response.secure_url
        // },
        parentName,
        parentPhoneNo,
        country,
        state,
        city,
        zipCode,
        email,
        phoneNo,
        department,
        year,
      },
      { new: true }
    );

    if (!updatedStudent || updatedStudent.length === 0) {
      return res.status(404).json({ error: "❌ Student not found" });
    }

    console.log("Student updated successfully ✅", updatedStudent);
    res
      .status(200)
      .json({ message: "Student updated successfully ✅", updatedStudent });
  } catch (error) {
    console.log("❌ERROR !! in UpdateStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const existStudent = await StudentSchema.findById({ _id: studentId });
    if (!existStudent) {
      console.log("❌ERROR !! student not found");
      return res.status(404).json({ error: "Student not found" });
    }
    const deletedStudent = await StudentSchema.findByIdAndDelete(
      existStudent._id
    );
    if (!deletedStudent) {
      console.log("❌ERROR !!in deleting Student not found");
      return res.status(404).json({ error: "❌ Student not found" });
    }
    console.log("Student deleted successfully ✅", deletedStudent.fullName);
    res.status(200).json({
      message: "Student deleted successfully ✅",
      student: deletedStudent.fullName,
    });
  } catch (error) {
    console.log("❌ERROR !! in deleteStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//take attendance
export const takeAttendance = async (req, res) => {
  const { attendance, department, date, year } = req.body;
  try {
    if (
      !attendance ||
      !department ||
      !date ||
      !year ||
      attendance.length === 0
    ) {
      console.log(
        "ERROR !! in takeAttendance controller required data not found"
      );
      return res.status(404).json({ error: "plese provide all data" });
    }

    const isExist = await AttendanceSchema.findOne({ department, year, date });
    console.log(isExist);

    if (isExist) {
      return res
        .status(409)
        .json({ error: "Attendance already marked for this date" });
    }
    const newAttendance = new AttendanceSchema({
      attendance,
      department,
      date,
      year,
    });

    await newAttendance.save();
    console.log("attendance record save successfully", newAttendance);
    return res
      .status(200)
      .json({ message: "Attendance Published succesfully" });
  } catch (error) {
    console.log("ERROR !! in takeAttendance conotroller:", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//view Attendance
export const viewAttendance = async (req, res) => {
  const { department, year, filtermonth } = req.query;
  try {
    if (!department || !year) {
      console.log(
        "ERROR !! in admin view attendance controller require data not found"
      );
      return res
        .status(404)
        .json({ error: "Please select department and year" });
    }

    const student = await StudentSchema.find({ department, year });
    if (!student || student.length === 0) {
      //student check
      console.log("ERROR !! in view attendaance controller studennt not found");
      return res.status(404).json({ error: "No students found" });
    }

    const attendanceRecord = await AttendanceSchema.find({ department, year });
    //attendance record check
    if (!attendanceRecord) {
      console.log(
        "ERROR !! in admin viewattendance controller attendance data not found"
      );
      return res.status(404).json({ error: "AttendanceRecord Not Found" });
    }
    let filterRecord = attendanceRecord;
    if (filtermonth) {
      filterRecord = attendanceRecord.filter((rec) => {
        const recMonth = new Date(rec.date).getMonth() + 1;
        return recMonth === parseInt(filtermonth);
      });
    }
    //final check
    if (!filterRecord) {
      console.log(
        "ERROR !! in view attendance controller filter record not found"
      );
      return res.status(404).json({ error: "No Record Found" });
    }
    // result for each student
    const result = student.map((std) => {
      let present = 0;
      let absent = 0;

      filterRecord.forEach((record) => {
        record.attendance.forEach((entry) => {
          if (entry.stdId.toString() === std._id.toString()) {
            if (entry.status === true) {
              present++;
            } else {
              absent++;
            }
          }
        });
      });

      return {
        studentId: std._id,
        studentName: std.studentName,
        email: std.email,
        rollNo: std.rollNo,
        present: present,
        absent: absent,
      };
    });

    return res
      .status(200)
      .json({ message: "Fetch Attendance successfull", result });
  } catch (error) {
    console.log("ERROR !! in admin view Attendance controller :", error);
    return res.status(500).jspn({ error: "Internal server error" });
  }
};

//admin addResult
export const addResult = async (req, res) => {
  const { department, year, examName, ExamDate, fullMark, stdResult } =
    req.body;
  try {
    console.log(department, year, examName, ExamDate, fullMark, stdResult);
    if (
      !department ||
      !year ||
      !examName ||
      !ExamDate ||
      !fullMark ||
      !stdResult ||
      stdResult.length === 0
    ) {
      console.log("ERROR !! in addResult controller required data not found");
      return res.status(404).json({ error: "pleas provid all data" });
    }

    //  const isExist=await resultSchema.findOne({examName,examDate});
    //            if(isExist){
    //             console.log('ERROR !! Exam have same name and date aleardy exist');
    //             return res.status(409).json({error:'Exam have same name and date aleardy exist'});
    //            }
    const newResult = new resultSchema({
      department,
      year,
      examName,
      ExamDate,
      fullMark,
      stdResult,
    });

    await newResult.save();
    console.log("Result added successfully", newResult);
    return res.status(200).json({ message: "Result added successfully" });
  } catch (error) {
    console.log("ERROR !! in addResult controller:", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

//admin View results
export const adminViewResult = async (req, res) => {
  const { department, year } = req.query;

  try {
    if (!department || !year) {
      console.log("ERROR !! in admin view result pleas provied all data");
      return res.status(404).json({ error: "pleas provide all data" });
    }

    const results = await resultSchema.find({ department, year });
    if (!results && results.length === 0) {
      console.log("No Result Found !!");
      return res.status(404).json({ error: "NO result Found !!" });
    }
    console.log(results);

    return res.status(200).json({ results });
  } catch (error) {
    console.log("ERROR !! in admin view Result controller", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

//pay fees
export const payFees = async (req, res) => {
  const { payMode, payAmount, paymentId, dateOfPay } = req.body;
  const { stdId } = req.params;
  try {
    //check user exist or not in studentList
    const isExist = await StudentSchema.findById(stdId);
    console.log("isExist=",payMode, payAmount, paymentId, dateOfPay );

    if (!isExist) {
      console.log("ERROR !! in payFee controller user not exist");
      return res
        .status(404)
        .json({ error: "user not found pleas check carefully" });
    }
    const department = isExist.department;

    if (!payMode || !payAmount || !paymentId || !dateOfPay) {
      console.log("ERROR !! in payFee controller required data not found");
      return res.status(409).json({ error: "please fillup all field" });
    }

    //set total amount according to respective departgment
    let totalAmount;
    if (["BBA", "BBT", "BCA", "plus3"].includes(department)) {
      totalAmount = 150000;
    } else if (["MBA", "MCA"].includes(department)) {
      totalAmount = 120000;
    } else if (["plus2", "diploma"].includes(department)) {
      totalAmount = 110000;
    } else if (department === "B_tech") {
      totalAmount = 200000;
    } else {
      return res.status(400).json({ error: "Invalid department" });
    }

    // payment history object
    const paymentEntry = {
      amount: payAmount,
      payMode,
      paymentId,
      date: new Date(dateOfPay),
    };

    const existingpayment = await paymentSchema.findOne({ stdId });
    let updatePayment;
    if (!existingpayment || existingpayment === null) {
      //create a new std account record
      updatePayment = await paymentSchema.create({
        stdId,
        studentName: isExist.studentName,
        department,
        year: isExist.year,
        totalAmount,
        totalDipositAmount: payAmount,
        remainAmount: totalAmount - payAmount,
        history: [paymentEntry],
      });
    } else {
      //update existing payment
      updatePayment = await paymentSchema.findOneAndUpdate(
        { stdId },
        {
          $inc: {
            totalDipositAmount: payAmount,
            remainAmount: -payAmount,
          },
          $push: { history: paymentEntry },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      message: "Payment successfully",
      data: updatePayment,
    });
  } catch (error) {
    console.log("ERROR !! in payFees controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//view  payments hero page
export const admin_account = async (req, res) => {
  try {
    const payments = await paymentSchema.find();

    if (!payments || payments.length === 0) {
      console.log(
        "ERROR !! in admin_account controller no payment record found"
      );
      return res.status(404).json({ error: "No Payment Record Found" });
    }

    //getting students
    const students = [];
    if (req.query) {
      const { department, year } = req.query;
      const res = await StudentSchema.find({ department, year });

      res.forEach((e) => {
        students.push({
          stdId: e._id,
          studentName: e.studentName,
          rollNo: e.rollNo,
        });
      });
    }

    //total collection
    const totalcollection = payments.reduce((acc, cur) => {
      return acc + cur.totalDipositAmount;
    }, 0);

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const monthlyCollection = months.map((m) => ({
      name: m,
      collection_amount: 0,
    }));
    //calculate monthly collections
    payments.forEach((e) => {
      e.history.forEach((f) => {
        const monthIndex = new Date(f.date).getMonth();
        monthlyCollection[monthIndex].collection_amount += f.amount;
      });
    });

 
     
    return res
      .status(200)
      .json({
        message: "payment fetched successfully",
        totalcollection,
        monthlyCollection,
        students,
      });
  } catch (error) {
    console.log("ERROR !! in view payment controller:", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

//viwe pay detail
export const viewPayment=async (req,res)=>{
  const {stdId}=req.params;
   try {
     
    const existStd=await paymentSchema.findOne({stdId});
    if(!existStd){
      console.log('ERROR !! in viewPayment controller Student doesnt exist or No payment Initiate !!');
      return res.status(404).json({error:'No payment Initiated'});
    }
   
      console.log("Data fetch successfully");
    return res.status(200).json({message:"data fetch Successfully",record:existStd});
   } catch (error) {
    console.log('ERROR !! in viewpayment controller',error);
    return res.status("ONternal server error");
   }
};
