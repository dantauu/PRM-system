export interface Contact {
  contact_id: number
  owner_id: number
  first_name: string
  last_name: string
  phone: string
  creation_date: string
  contact_creation_method_id: number
}

export interface ContactInfo {
  telegram_ID: string
  city: string
  country: string
  profession: string
  birth_date: string
  comment: string
  avatar: string
}

export type ContactWithInfo = Contact & ContactInfo

export type UpdateContactData = Omit<
  ContactWithInfo,
  'owner_id' | 'contact_creation_method_id' | 'creation_date'
>

export type CreateContactData = Omit<
  ContactWithInfo,
  'contact_id' | 'owner_id' | 'contact_creation_method_id' | 'creation_date'
>

export interface DeleteContactData {
  contact_id: number
}

export interface DeleteData {
  status: boolean
}
