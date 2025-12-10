import express from "express";
import {
  addStudent,
  adminLogin,
  adminViewStudents,
  deleteStudent,
  takeAttendance,
  UpdateStudent,addResult,
  adminViewResult,
  payFees,
  admin_account,
  viewAttendance,
  viewPayment,
  viewAllStd
} from "../controller/admin.controller.js";
import adminMiddleware from "../middleware/admin.mid.js";

const router = express.Router();

router.post("/adminlogin", adminLogin);
router.post("/addstudent", adminMiddleware, addStudent);
router.get("/viewstudents",adminMiddleware, adminViewStudents);
router.put("/updatestudent/:studentId", adminMiddleware, UpdateStudent);
router.delete("/deletestudent/:studentId", adminMiddleware, deleteStudent);
router.post("/takeattendance",adminMiddleware, takeAttendance);
router.get("/viewattendance", adminMiddleware,viewAttendance);
router.post("/addResult",adminMiddleware,addResult); 
router.get("/viewresults",adminMiddleware,adminViewResult);
router.post("/payment/:stdId",adminMiddleware,payFees);
router.get("/admin_account",adminMiddleware,admin_account);
router.get("/view_payment/:stdId",adminMiddleware,viewPayment);
router.get("/viewallstudent",adminMiddleware,viewAllStd);

export default router;
