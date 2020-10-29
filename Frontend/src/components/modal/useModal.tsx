import { useState } from 'react'

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false)
  const openModal = () => setIsShown(true)
  const closeModal = () => setIsShown(false)
  return {
    isShown,
    openModal,
    closeModal,
  }
}
