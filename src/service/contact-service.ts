import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidotion } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

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
}