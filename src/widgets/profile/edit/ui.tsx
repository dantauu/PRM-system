import './style.scss'
import { Form, MemoButton, PageLayout } from '@/shared/components'
import { $$editProfileForm, $$session } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { FC, ReactNode, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

export const EditProfile: FC = () => {
  // Effector
  const [name, surname, phone, birthday, city, email, password] = useUnit([
    $$editProfileForm.$firstName,
    $$editProfileForm.$lastName,
    $$editProfileForm.$phone,
    $$editProfileForm.$birthday,
    $$editProfileForm.$city,
    $$editProfileForm.$email,
    $$editProfileForm.$password,
  ])

  const [error] = useUnit([$$editProfileForm.$error])

  const [
    nameChanged,
    surnameChanged,
    phoneChanged,
    birthdayChanged,
    cityChanged,
    emailChanged,
    passwordChanged,
  ] = useUnit([
    $$editProfileForm.firstNameChanged,
    $$editProfileForm.lastNameChanged,
    $$editProfileForm.phoneChanged,
    $$editProfileForm.birthdayChanged,
    $$editProfileForm.cityChanged,
    $$editProfileForm.emailChanged,
    $$editProfileForm.passwordChanged,
  ])

  const [reseted, submited] = useUnit([$$editProfileForm.reseted, $$editProfileForm.submited])

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
      className="edit-profile"
      header={{
        title: 'Редактировать профиль',
        subtitle: 'Для сохранения данных требуется ввести пароль',
      }}
    >
      <Form
        footer={
          <>
            {error && <div className="edit-profile__error">{error}</div>}
            <div className="edit-profile__buttons">
              <MemoButton onClick={submited}>Сохранить</MemoButton>
            </div>
          </>
        }
      >
        <Row className="custom-row">
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              label="Имя"
              placeholder="Имя"
              value={name}
              onChange={nameChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              label="Фамилия"
              placeholder="Фамилия"
              value={surname}
              onChange={surnameChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              type="email"
              label="Email"
              placeholder="Email: mail@gmail.com"
              value={email}
              onChange={emailChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              type="password"
              name="passwordForConfrimEdit"
              label="Пароль"
              placeholder="*******"
              value={password}
              onChange={passwordChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              type="date"
              label="Дата рождения"
              placeholder="Дата рождения"
              value={birthday}
              onChange={birthdayChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              type="telephone"
              label="Телефон"
              placeholder="+7 (XXX) XXX XX XX"
              value={phone}
              onChange={phoneChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              className="edit-profile__input"
              label="Город"
              placeholder="Москва"
              value={city}
              onChange={cityChanged}
            />
          )}
        </Row>
      </Form>
    </PageLayout.Cloud>
  )
}
