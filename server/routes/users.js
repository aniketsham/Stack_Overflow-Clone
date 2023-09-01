import  express from "express";
import {login,signup} from '../controllers/auth.js'
import { getAllUsers,forgotPassword,updateProfile,verifyToken,setSubsDetails } from '../controllers/users.js'
import { capturePayment } from "../controllers/Payment.js";
import { orderPayment } from "../controllers/Payment.js";
import  auth  from '../middleware/auth.js'


const router= express.Router()

router.post('/login',login)
router.post('/signup',signup)

router.post('/getAllUsers',getAllUsers)
router.post('/update/:id',auth,updateProfile)
router.post('/forgotpassword',forgotPassword)
router.post('/verifyToken',verifyToken)
router.post('/order/:subsValue',orderPayment)
router.post('/capture',capturePayment)
router.post('/setSubsDetails/:id',setSubsDetails)
export default router;