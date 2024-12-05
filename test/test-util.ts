import { prismaClient } from "../src/application/database";
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'
import { Contact } from "@prisma/client";

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

// =================== contact test
export class ContactTest {

   static async create() {
      await prismaClient.contact.create({
         data: {
            first_name: "Gilang",
            last_name: "Romly",
            email: "gilangromly@gmail.com",
            phone: "0895322321248",
            username: "Amar Palevi"
         }
      })
   }

   static async get(): Promise<Contact> {
      const contact = await prismaClient.contact.findFirst({
         where: {
            username: "Amar Palevi"
         }
      })

      if(!contact) {
         throw new Error('contact is not found')
      }

      return contact
   }

   static async deleteAll() {
      await prismaClient.contact.deleteMany({
         where: {
            username: "Amar Palevi"
         }
      })
   }
}