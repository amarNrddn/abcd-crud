import { User, Contact } from "@prisma/client";
import { ContactResponse, CreateContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidotion } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {
   static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
      const createRequest = Validation.validate(ContactValidotion.CREATE, request)

      const record = {
         ...createRequest,
         ...{ username: user.username }
      }

      const contact = await prismaClient.contact.create({
         data: record
      })

      logger.debug("record: " + JSON.stringify(contact))

      return toContactResponse(contact)
   }

   static async checkcContactMustExists(username: string, contactId: number): Promise<Contact> {
      const contact = await prismaClient.contact.findFirst({
         where: {
            id: contactId,
            username: username
         }
      })

      if (!contact) {
         throw new ResponseError(404, "Canot not found")
      }

      return contact
   }

   static async get(user: User, id: number): Promise<ContactResponse> {
      const contact = await this.checkcContactMustExists(user.username, id)

      return toContactResponse(contact)
   }

   static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
      console.log("validation.....")
      const updateRequest = Validation.validate(ContactValidotion.UPDATE, request)
      await this.checkcContactMustExists(user.username, updateRequest.id)

      const contact = await prismaClient.contact.update({
         where: {
            id: updateRequest.id,
            username: user.username
         },
         data: updateRequest
      })

      console.log(contact)

      return toContactResponse(contact)
   }
}