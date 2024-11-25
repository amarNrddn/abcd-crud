import { prismaClient } from "../src/application/database";

export class UserTest {
   static async delet() {
      await prismaClient.user.deleteMany({
         where: {
            username: "Amar Palevi"
         }
      })
   }
}