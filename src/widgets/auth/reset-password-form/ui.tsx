import './style.scss'
import { AuthLayout, Form } from '@/shared/components'
import classNames from 'classnames'
import { FC, memo } from 'react'
import { Col, Row } from 'react-bootstrap'

interface ResetPasswordFormProps {
  className?: string
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ className }) => {
  const ClassName = classNames('reset-password-form', className)

  return (
    <AuthLayout.Form
      className={ClassName}
      title="Сброс пароля"
      subtitle="Забыли пароль? Введите свой e-mail адресс ниже, и мы вышлем вам письмо для сброса пароля."
      buttonSlot={<AuthLayout.Button text="Сбросить мой пароль" />}
    >
      <Row className="custom-row">
        <Col xs={12}>
          <div className="reset-password-form__connect-us">
            Пожалуйста, свяжитесь с нами, если у вас возникнут проблема со сбросом пароля.
          </div>
        </Col>
        <Col xs={12}>
          <Form.Input
            label="Email"
            placeholder="Введите E-Mail"
          />
        </Col>
      </Row>
    </AuthLayout.Form>
  )
}

export const MemoResetPasswordForm = memo(ResetPasswordForm)
