import { ZodType, z } from "zod";

export class ContactValidotion {
   static readonly CREATE: ZodType = z.object({
      first_name: z.string().min(3).max(100),
      last_name: z.string().min(3).max(100),
      email: z.string().min(5).max(100),
      phone: z.string().min(12).max(13)
   })
}