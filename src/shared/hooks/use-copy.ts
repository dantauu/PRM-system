import copy from 'copy-to-clipboard'
import { useCallback } from 'react'

export const useCopy = (text: string) => {
  const onCopy = useCallback(() => {
    copy(text, {
      debug: true,
      message: 'Press #{key} to copy',
    })
  }, [text])

  return { onCopy }
}
