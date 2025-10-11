import express from 'express'
import { account, attendance, result, studentLogin, students, studentSignup } from '../controller/student.controller.js';
import studentMiddleware from '../middleware/student.mid.js';

const router=express.Router();

router.get('/students',students)
router.post('/studentsignup',studentSignup);
router.post('/studentlogin',studentLogin);
router.get('/attendance',studentMiddleware,attendance);
router.get('/results',studentMiddleware,result);
router.get('/account',studentMiddleware,account);
 
export default router;
