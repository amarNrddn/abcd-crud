export type ContactResponse = {
   id: number,
   first_name: string,
   last_name?: string | null,
   email?: string | null,
   phone?: string | null
}

export type CreateContactRequest = {
   first_name: string,
   last_name?: string,
   email?: string,
   phone?: string
}

