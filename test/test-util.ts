import { prismaClient } from "../src/application/database";
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

export class UserTest {
   static async delet() {
      await prismaClient.user.deleteMany({
         where: {
            username: "Amar Palevi"
         }
      })
   }

   static async create() {
      await prismaClient.user.create({
         data: {
            username: "Amar Palevi",
            name: "amar",
            password: await bcrypt.hash("kelalensandine", 10),
            token: "testing"
         }
      })
   }

   static async get() {
      const user = await prismaClient.user.findFirst({
         where: { username: "Amar Palevi" }
      })

      if (!user) {
         throw new Error("User is not found")
      }

      return user
   }
}