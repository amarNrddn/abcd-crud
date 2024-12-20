
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";
import bcrypt from 'bcrypt'
import { prismaClient } from "../application/database";
import { v4 as uuid } from 'uuid'
import { User } from "@prisma/client";

export class UserServices {

   static async register(request: CreateUserRequest): Promise<UserResponse> {
      const registerRequest = Validation.validate(UserValidation.REGISTER, request)

      const totalUserWithSameUsername = await prismaClient.user.count({
         where: {
            username: registerRequest.username
         }
      })

      if (totalUserWithSameUsername != 0) {
         throw new ResponseError(400, 'Username all ready exists')
      }

      registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

      const user = await prismaClient.user.create({
         data: registerRequest
      })

      return toUserResponse(user)
   }

   static async login(request: LoginUserRequest): Promise<UserResponse> {
      const loginRequest = Validation.validate(UserValidation.LOGIN, request)

      let checkUser = await prismaClient.user.findUnique({
         where: {
            username: loginRequest.username
         }
      })

      if (!checkUser) {
         throw new ResponseError(401, "Username or Password is worng")
      }

      const passwordIsValid = await bcrypt.compare(loginRequest.password, checkUser.password)

      if (!passwordIsValid) {
         throw new ResponseError(401, "Username or Password is worng")
      }

      checkUser = await prismaClient.user.update({
         where: {
            username: loginRequest.username
         },
         data: {
            token: uuid()
         }
      });

      const response = toUserResponse(checkUser)
      response.token = checkUser.token!
      return response
   }

   static async get(user: User): Promise<UserResponse> {
      return toUserResponse(user)
   }

   static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
      const updateRequest = Validation.validate(UserValidation.UPDATE, request)

      if (updateRequest.name) {
         user.name = updateRequest.name
      }

      if (updateRequest.password) {
         user.password = await bcrypt.hash(updateRequest.password, 10)
      }

      const result = await prismaClient.user.update({
         where: {
            username: user.username
         },
         data: user
      })

      return toUserResponse(result)
   }

   static async logout(user: User): Promise<UserResponse> {
      const result = await prismaClient.user.update({
         where: {
            username: user.username
         },
         data: {
            token: null
         }
      })

      return toUserResponse(result)
   }

}