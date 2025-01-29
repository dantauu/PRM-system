import { Blob } from '../blob/ui'
import { Button } from '../buttons'
import './styles.scss'
import { ContactSidebarIcon } from '@/shared/assets'
import { $$session } from '@/shared/effector'
import { $isModalOpen, closeModal } from '@/shared/effector/profile/modal-welcome-status'
import { useMediaQuery } from '@/shared/hooks'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'

interface Props {}

export const ModalWelcome: FC<Props> = ({}) => {
  const [step, setStep] = useState(0)
  const [isOpenModal, close] = useUnit([$isModalOpen, closeModal])
  const auth = useUnit($$session.$auth)

  const isDesktop = useMediaQuery('screen and (min-width: 1201px)')

  const handleClickButton = () => {
    localStorage.setItem('is-first-loading', false.toString())
    setStep(2)
  }

  useEffect(() => {
    // console.log("auth в сет таймаут", auth)
    let timer: ReturnType<typeof setTimeout>
    if (auth === 2) {
      timer = setTimeout(() => {
        setStep(1)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [auth])

  return (
    <>
      {auth === 2 ? (
        <>
          {step === 1 && (
            <div
              className={isOpenModal ? 'modall open' : 'modall close'}
              onClick={close}
            >
              <div
                className="modal-content"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Blob
                  image={'BlobWebpBlue'}
                  className="blob"
                />
                <p className="title-welcome">
                  Добро пожаловать в личный кабинет PRM. <br /> Давайте начнём!
                </p>
                <Button
                  className="modal-content-button-welcome"
                  variant="primary"
                  onClick={handleClickButton}
                >
                  Начать
                </Button>
              </div>
            </div>
          )}

          {step === 2 && isDesktop && (
            <>
              {isOpenModal && (
                <Link
                  to={routes.account.contact.items}
                  className="modal-content-welcome"
                  onClick={close}
                >
                  <ContactSidebarIcon className="sidebar-nav-item__icon" />
                  <div className="sidebar-nav-item__title">Контакты</div>

                  <div className="circle-outer"></div>
                  <div className="circle-inner"></div>
                </Link>
              )}
              <div
                className={isOpenModal ? 'modall open' : 'modall close'}
                onClick={close}
              >
                <div
                  className="modal-content"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Blob
                    image={'BlobWebpBlue'}
                    className="blob"
                  />
                  <p className="title-welcome-stepTwo">
                    Для начала работы перейдите в раздел контакты
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  )
}
