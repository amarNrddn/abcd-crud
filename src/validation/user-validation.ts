import { ZodType, z } from 'zod'

export class UserValidation {
   static readonly REGISTER: ZodType = z.object({
      username: z.string().min(3).max(100),
      password: z.string().min(8).max(100),
      name: z.string().min(5).max(100)
   })
}