import { Request, Response, NextFunction } from "express";
import { UserServices } from "../service/user-service";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserRequest } from "../type/user-request";

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

   static async get(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const response = await UserServices.get(req.user!)

         res.status(200).json({
            data: response
         })
      } catch (error) {
         next(error)
      }
   }

   static async update(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: UpdateUserRequest = req.body as UpdateUserRequest
         const response = await UserServices.update(req.user!, request)

         res.status(200).json({
            data: response
         })
      } catch (error) {
         next(error)
      }
   }
}