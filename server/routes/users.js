import  express from "express";
import {login,signup} from '../controllers/auth.js'
import { getAllUsers,updateProfile } from '../controllers/users.js'
import  auth  from '../middleware/auth.js'

const router= express.Router()

router.post('/login',login)
router.post('/signup',signup)

router.post('/getAllUsers',getAllUsers)
router.post('/update/:id',auth,updateProfile)
export default router;