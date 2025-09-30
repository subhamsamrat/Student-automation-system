import express from "express";
import {
  addStudent,
  adminLogin,
  adminViewAllStudents,
  deleteStudent,
  takeAttendance,
  UpdateStudent,addResult,
  adminViewResult,
  payFees,
  viewpayment
} from "../controller/admin.controller.js";
import adminMiddleware from "../middleware/admin.mid.js";

const router = express.Router();

router.post("/adminlogin", adminLogin);
router.post("/addstudent", adminMiddleware, addStudent);
router.get("/viewstudents", adminViewAllStudents);
router.put("/updatestudent/:studentId", adminMiddleware, UpdateStudent);
router.delete("/deletestudent/:studentId", adminMiddleware, deleteStudent);
router.post("/takeattendance",adminMiddleware, takeAttendance);
router.post("/addResult",addResult);
router.get("/viewresults",adminViewResult);
router.post("/payment/:stdId",payFees);
router.get("/viewpayment",viewpayment);

export default router;
