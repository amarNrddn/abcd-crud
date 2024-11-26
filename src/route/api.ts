import express from "express"
import { authMiddelware } from "../middelware/auth-middelware"
import { UserController } from "../controller/user-controller"

export const apiRouter = express.Router()

apiRouter.use(authMiddelware)

apiRouter.get('/api/user/current', UserController.get)