export interface Landing {
  phone: string
  vk: string
  instagram: string
  telegram: string
  youtube: string
  about: string
  youtube_video: string
}

export interface LandingRef {
  user_id: number
  first_name: string
  last_name: string
  phone: string
  avatar: string
  about: string
  vk: string
  instagram: string
  telegram: string
  youtube: string
  youtube_video: string
}

export type UpdateLandingRef = Omit<LandingRef, 'user_id' | 'first_name' | 'last_name' | 'avatar'>
