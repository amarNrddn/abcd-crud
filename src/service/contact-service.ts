import { User, Contact } from "@prisma/client";
import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidotion } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { response } from "express";

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
      const updateRequest = Validation.validate(ContactValidotion.UPDATE, request)
      await this.checkcContactMustExists(user.username, updateRequest.id)

      const contact = await prismaClient.contact.update({
         where: {
            id: updateRequest.id,
            username: user.username
         },
         data: updateRequest
      })

      return toContactResponse(contact)
   }

   static async remove(user: User, id: number): Promise<ContactResponse> {
      await this.checkcContactMustExists(user.username, id)

      const contact = await prismaClient.contact.delete({
         where: {
            id: id,
            username: user.username
         }
      })

      console.log(contact)

      return toContactResponse(contact)
   }

   static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
      const searchRequest = Validation.validate(ContactValidotion.SEARCH, request)
      const skip = (searchRequest.page - 1) * searchRequest.size

      const filter = []

      if (searchRequest.user) {
         filter.push({
            OR: [
               {
                  first_name: {
                     contains: searchRequest.name
                  }
               },
               {
                  last_name: {
                     contains: searchRequest.name
                  }
               }
            ]
         })
      }

      if (searchRequest.email) {
         filter.push({
            email: {
               contains: searchRequest.email
            }
         })
      }

      if (searchRequest.phone) {
         filter.push({
            phone: searchRequest.phone
         })
      }

      const contacts = await prismaClient.contact.findMany({
         where: {
            username: user.username,
            AND: filter
         },
         take: searchRequest.size,
         skip: skip
      })

      const total = await prismaClient.contact.count({
         where: {
            username: user.username,
            AND: filter
         }
      })

      console.log(response)

      return {
         data: contacts.map(contact => toContactResponse(contact)),
         pagging: {
            current_page: searchRequest.page,
            total_page: Math.ceil(total / searchRequest.size),
            size: searchRequest.size
         }
      }
   }
}