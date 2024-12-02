import supertest from "supertest";
import { web } from '../src/application/web'
import { ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST/api/contacts", () => {
   beforeEach(async () => {
      await UserTest.create()
   })

   afterEach(async () => {
      await ContactTest.deleteAll()
      await UserTest.delet()
   })

   it("Shold create new Contact", async () => {
      const response = await supertest(web)
         .post("/api/contacts")
         .set("X-API-TOKEN", "testing")
         .send({
            first_name: "Gilang",
            last_name: "Romly",
            email: "gilangromly@gmail.com",
            phone: "0895322321248",
            username: "Amar Palevi"
         })

      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.first_name).toBe("Gilang")
      expect(response.body.data.last_name).toBe("Romly")
      expect(response.body.data.email).toBe("gilangromly@gmail.com")
      expect(response.body.data.phone).toBe("0895322321248")
   })

   it("shold reject createnew contact if data invalid", async () => {
      const response = await supertest(web)
         .post('/api/contacts')
         .set("X-API-TOKEN", "testing")
         .send({
            first_name: "",
            last_name: "",
            email: "",
            phone: "089532232124888788",
         })

      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
   })
})

describe("GET/api/contacts/:contactId", () => {
   beforeEach(async () => {
      await UserTest.create()
      await ContactTest.create()
   })

   afterEach(async () => {
      await ContactTest.deleteAll()
      await UserTest.delet()
   })

   it("should be able get contact", async () => {
      const contact = await ContactTest.get()
      const response = await supertest(web)
         .get(`/api/contacts/${contact.id}`)
         .set("X-API-TOKEN", "testing")

      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.first_name).toBe(contact.first_name)
      expect(response.body.data.last_name).toBe(contact.last_name)
      expect(response.body.data.email).toBe(contact.email)
      expect(response.body.data.phone).toBe(contact.phone)
   })

   it("should reject get contact if contact is not found", async () => {
      const contact = await ContactTest.get()
      const response = await supertest(web)
         .get(`/api/contacts/${contact.id + 1}`)
         .set("X-API-TOKEN", "testing")

      logger.debug(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
   })
})