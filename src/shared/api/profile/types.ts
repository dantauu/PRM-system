export interface Profile {
  first_name: string
  last_name: string
  phone: string
  birthday: string
  city: string
  email: string
  wallet_id: string
  avatar?: string
  qualification?: ProfileQualification
  activity?: ProfileActivity
  earned?: number
}

export interface ProfileQualification {
  name: string
  id: number
}

export interface ProfileActivity {
  name: string
  days: number
}
