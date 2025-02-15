import { Router } from "express";
import auth from "./auth.route"


const routes = Router()


routes.use('/authRoutes', auth)

export default routes