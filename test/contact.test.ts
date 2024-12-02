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
})