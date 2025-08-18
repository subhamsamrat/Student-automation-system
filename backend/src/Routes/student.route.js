import express from 'express'
import { studentLogin, students, studentSignup } from '../controller/student.controller.js';

const router=express.Router();

router.get('/students',students)
router.post('/studentsignup',studentSignup);
router.post('/studentlogin',studentLogin);

export default router;