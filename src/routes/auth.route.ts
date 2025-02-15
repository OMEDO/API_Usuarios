import express from 'express'
import { addUser } from '../controller/auth.controller';

const router = express.Router()

router.post('/', addUser)

export default router;