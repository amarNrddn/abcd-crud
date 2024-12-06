import express from "express"
import { authMiddelware } from "../middelware/auth-middelware"
import { UserController } from "../controller/user-controller"
import { ContactController } from "../controller/contact-controller"

export const apiRouter = express.Router()

apiRouter.use(authMiddelware)

apiRouter.get('/api/user/current', UserController.get)
apiRouter.patch('/api/user/current', UserController.update)
apiRouter.delete('/api/user/current', UserController.logout)

// ====================== contact route
apiRouter.post('/api/contacts', ContactController.create)
apiRouter.get('/api/contacts/:contactId(\\d+)', ContactController.get)
apiRouter.put('/api/contacts/:contactId(\\d+)', ContactController.update)
apiRouter.delete('/api/contacts/:contactId(\\d+)', ContactController.destroy)
apiRouter.get('/api/contacts', ContactController.search)