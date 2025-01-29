import { $$session, Auth } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export const useAuthorized = (needRedirectToLanding: boolean = false) => {
  // Effector
  const auth = useUnit($$session.$auth)

  // Variables
  const authing = auth === Auth.Unknown
  const isAuthorized = auth === Auth.Authorized
  const isAnonymous = auth === Auth.Anonymous

  // Effect
  useEffect(() => {
    if (!needRedirectToLanding) {
      return
    }

    if (authing) {
      return
    }

    if (isAnonymous) {
      location.pathname = '/'
    }
  }, [authing, isAnonymous, needRedirectToLanding])

  return {
    authing,
    isAuthorized,
    isAnonymous,
  }
}
