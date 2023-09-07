import express from 'express'

import { postAnswer,deleteAnswer } from '../controllers/Answers.js';
import auth from '../middleware/auth.js';
const router = express.Router()

router.post('/post/:id',auth,postAnswer);
router.post('/delete/:id',auth,deleteAnswer)
export default router;
