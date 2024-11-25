import { Request, Response, NextFunction } from "express";
import { UserServices } from "../service/user-service";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";

export class UserController {
   static async register(req: Request, res: Response, next: NextFunction) {
      try {
         const request: CreateUserRequest = req.body as CreateUserRequest

         const response = await UserServices.register(request)

         res.status(200).json({
            data: response
         })

      } catch (error) {
         next(error)
      }
   }

   static async login(req: Request, res: Response, next: NextFunction) {
      try {
         const request: LoginUserRequest = req.body as LoginUserRequest

         const response = await UserServices.login(request)

         res.status(200).json({
            data: response
         })
      } catch (error) {
         next(error)
      }
   }
}