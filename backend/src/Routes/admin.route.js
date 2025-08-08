import express from "express";
import {
  addStudent,
  adminLogin,
  adminViewAllStudents,
  deleteStudent,
  takeAttendance,
  UpdateStudent,
} from "../controller/admin.controller.js";
import adminMiddleware from "../middleware/admin.mid.js";

const router = express.Router();

router.post("/adminlogin", adminLogin);
router.post("/addstudent", adminMiddleware, addStudent);
router.get("/viewstudents", adminMiddleware, adminViewAllStudents);
router.put("/updatestudent/:studentId", adminMiddleware, UpdateStudent);
router.delete("/deletestudent/:studentId", adminMiddleware, deleteStudent);
router.delete("/takeattendance", adminMiddleware, takeAttendance);

export default router;
