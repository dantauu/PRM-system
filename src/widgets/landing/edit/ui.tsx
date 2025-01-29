import './style.scss'
import { Form, MemoButton, PageLayout } from '@/shared/components'
import { $$alerts, $$editLandingForm, $$session } from '@/shared/effector'
import { useCopy } from '@/shared/hooks'
import { useUnit } from 'effector-react'
import { FC, ReactNode, useCallback, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

export const EditLanding: FC = () => {
  // Effector
  const login = useUnit($$session.$login)

  const [phone, vk, instagram, telegram, youtube, about, youtubeVideo] = useUnit([
    $$editLandingForm.$phone,
    $$editLandingForm.$vk,
    $$editLandingForm.$instagram,
    $$editLandingForm.$telegram,
    $$editLandingForm.$youtube,
    $$editLandingForm.$about,
    $$editLandingForm.$youtubeVideo,
  ])

  const [
    phoneChanged,
    vkChanged,
    instagramChanged,
    telegramChanged,
    youtubeChanged,
    aboutChanged,
    youtubeVideoChanged,
  ] = useUnit([
    $$editLandingForm.phoneChanged,
    $$editLandingForm.vkChanged,
    $$editLandingForm.instagramChanged,
    $$editLandingForm.telegramChanged,
    $$editLandingForm.youtubeChanged,
    $$editLandingForm.aboutChanged,
    $$editLandingForm.youtubeVideoChanged,
  ])

  const [reseted, submited] = useUnit([$$editLandingForm.reseted, $$editLandingForm.submited])

  const showAlert = useUnit($$alerts.showSuccess)

  // Hooks
  const { onCopy } = useCopy(location.origin + '/ref/' + login)

  // Handlers
  const handleCopy = useCallback(() => {
    onCopy()
    showAlert('Скопировано')
  }, [onCopy, showAlert])

  // Effect
  useEffect(() => {
    reseted
  }, [reseted])

  // Render
  const renderInCol = (element: ReactNode) => (
    <Col
      xs={12}
      md={6}
      lg={4}
    >
      {element}
    </Col>
  )

  return (
    <PageLayout.Cloud
      className="edit-landing"
      header={{
        title: 'Ваш Landing page',
      }}
    >
      <Form
        footer={
          <div className="edit-landing__buttons">
            <MemoButton onClick={submited}>Сохранить</MemoButton>
            <MemoButton onClick={handleCopy}>Копировать ссылку</MemoButton>
          </div>
        }
      >
        <Row className="custom-row">
          <Col
            md={12}
            lg={8}
          >
            <Form.Input
              className="edit-landing__input"
              label="О себе"
              placeholder="Хочу представиться ......"
              value={about}
              onChange={aboutChanged}
            />
          </Col>
          {renderInCol(
            <Form.Input
              className="edit-landing__input"
              label="Телефон для связи"
              type="telephone"
              value={phone}
              onChange={phoneChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-landing__input"
              label="VK"
              placeholder="Введите ссылку"
              value={vk}
              onChange={vkChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-landing__input"
              label="Instagram"
              placeholder="Введите ссылку"
              value={instagram}
              onChange={instagramChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-landing__input"
              label="Telegram"
              placeholder="Введите ссылку"
              value={telegram}
              onChange={telegramChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-landing__input"
              label="YouTube канал"
              placeholder="Введите ссылку"
              value={youtube}
              onChange={youtubeChanged}
            />
          )}
          <Col
            xs={12}
            md={6}
            lg={8}
          >
            <Form.Input
              className="edit-landing__input"
              label="YouTube видео"
              placeholder="Введите ссылку"
              value={youtubeVideo}
              onChange={youtubeVideoChanged}
            />
          </Col>
        </Row>
      </Form>
    </PageLayout.Cloud>
  )
}
