import { ZodType, number, z } from "zod";

export class ContactValidotion {
   static readonly CREATE: ZodType = z.object({
      first_name: z.string().min(3).max(100),
      last_name: z.string().min(3).max(100).optional(),
      email: z.string().min(5).max(100).email().optional(),
      phone: z.string().min(12).max(13).optional()
   })

   static readonly UPDATE: ZodType = z.object({
      id: z.number().positive(),
      first_name: z.string().min(3).max(100),
      last_name: z.string().min(3).max(100).optional(),
      email: z.string().min(5).max(100).email().optional(),
      phone: z.string().min(12).max(13).optional()
   })

   static readonly SEARCH: ZodType = z.object({
      name: z.string().min(3).max(100).optional(),
      phone: z.string().min(12).max(13).optional(),
      email: z.string().min(5).max(100).email().optional(),
      page: number().min(1).positive(),
      size: number().min(1).max(100).positive()

   })
}