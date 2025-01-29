import './style.scss'
import { Form, MemoButton, PageLayout } from '@/shared/components'
import { $$contactEditForm } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, ReactNode, memo } from 'react'
import { Col, Row } from 'react-bootstrap'

interface EditContactFormProps {
  className?: string
}

export const EditContactForm: FC<EditContactFormProps> = ({ className }) => {
  // Effect
  const [surname, name, telephone, telegram, profession, birthDate, note, country, city] = useUnit([
    $$contactEditForm.$lastName,
    $$contactEditForm.$firstName,
    $$contactEditForm.$phone,
    $$contactEditForm.$telegramId,
    $$contactEditForm.$profession,
    $$contactEditForm.$birthDate,
    $$contactEditForm.$comment,
    $$contactEditForm.$country,
    $$contactEditForm.$city,
  ])

  const [
    surnameChanged,
    nameChanged,
    telephoneChanged,
    telegramChanged,
    professionChanged,
    birthDateChanged,
    noteChanged,
    countryChanged,
    cityChanged,
  ] = useUnit([
    $$contactEditForm.lastNameChanged,
    $$contactEditForm.firstNameChanged,
    $$contactEditForm.phoneChanged,
    $$contactEditForm.telegramIdChanged,
    $$contactEditForm.professionChanged,
    $$contactEditForm.birthDateChanged,
    $$contactEditForm.commentChanged,
    $$contactEditForm.countryChanged,
    $$contactEditForm.cityChanged,
  ])

  const [submited] = useUnit([$$contactEditForm.submited])

  // Variables
  const ClassName = classNames('edit-contact-form', className)

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
      className={ClassName}
      header={{ title: 'Редактировать контакт' }}
    >
      <Form footer={<MemoButton onClick={submited}>Сохранить</MemoButton>}>
        <Row className="custom-row">
          {renderInCol(
            <Form.Input
              name="contact-first-name"
              label="Имя"
              placeholder="Иван"
              value={name}
              onChange={nameChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-last-name"
              label="Фамилия"
              placeholder="Иванов"
              value={surname}
              onChange={surnameChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-project"
              label="Проект"
              placeholder="В разработке"
              disabled
            />
          )}
          {renderInCol(
            <Form.Input
              type="telephone"
              name="contact-phone"
              label="Телефон"
              placeholder="+7 (XXX) XXX XX XX"
              value={telephone}
              onChange={telephoneChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-telegram"
              label="Телеграм"
              placeholder="@telegramId"
              value={telegram}
              onChange={telegramChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-profession"
              label="Профессия"
              placeholder="Программист"
              value={profession}
              onChange={professionChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              type="date"
              name="contact-birth-date"
              label="Дата рождения"
              value={birthDate}
              onChange={birthDateChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-country"
              label="Страна"
              placeholder="Россия"
              value={country}
              onChange={countryChanged}
            />
          )}
          {renderInCol(
            <Form.Input
              name="contact-city"
              label="Город"
              placeholder="Москва"
              value={city}
              onChange={cityChanged}
            />
          )}
          <Col xs={12}>
            <Form.Input
              type="textarea"
              name="contact-note"
              label="Примечания"
              placeholder="Познакомились на нетворкинге"
              value={note}
              onChange={noteChanged}
            />
          </Col>
        </Row>
      </Form>
    </PageLayout.Cloud>
  )
}

export const MemoEditContactForm = memo(EditContactForm)
