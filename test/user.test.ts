import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"

describe('POST/api/user', () => {

   afterEach(async () => {
      await UserTest.delet()
   })

   it('shold reject register new user if request is valid', async () => {
      const response = await supertest(web)
         .post("/api/user")
         .send({
            username: "",
            password: "",
            name: ""
         })
      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
   })

   it('shold register new user', async () => {
      const response = await supertest(web)
         .post("/api/user")
         .send({
            username: "Amar Palevi",
            password: "kelalensandine",
            name: "amar"
         })

      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.username).toBe("Amar Palevi")
      expect(response.body.data.name).toBe("amar")
   })
})


describe('POST/api/user/login', () => {

   beforeEach(async () => {
      await UserTest.create()
   })

   afterEach(async () => {
      await UserTest.delet()
   })

   it('shold be able to login', async () => {
      const response = await supertest(web)
         .post('/api/user/login')
         .send({
            username: "Amar Palevi",
            password: "kelalensandine"
         })

      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.username).toBe("Amar Palevi")
      expect(response.body.data.name).toBe("amar")
      expect(response.body.data.token).toBeDefined()
   })
}) 