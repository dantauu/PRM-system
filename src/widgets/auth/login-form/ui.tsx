import './style.scss'
import { AuthLayout, Form } from '@/shared/components'
import { $$loginForm } from '@/shared/effector'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useEffect } from 'react'
import { Form as BootstrapForm, Col, Row } from 'react-bootstrap'

interface LoginFormProps {
  className?: string
}

const link = {
  beforeLink: 'Еще не зарегистрировались?',
  text: 'Создать аккаунт',
  to: routes.auth.registration,
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  // Effector
  const [email, emailChanged] = useUnit([$$loginForm.$email, $$loginForm.emailChanged])
  const [password, passwordChanged] = useUnit([$$loginForm.$password, $$loginForm.passwordChanged])

  const reseted = useUnit($$loginForm.reseted)
  const [submited, pending] = useUnit([$$loginForm.submited, $$loginForm.$pending])

  // Effect
  useEffect(() => reseted(), [reseted])

  // Variables
  const ClassName = classNames('login-form', className)

  return (
    <AuthLayout.Form
      className={ClassName}
      title="Вход"
      subtitle="Введите ваш  e-mail и пароль для входа."
      underForm={
        <div className="login-form__under-form">
          <div className="login-form__remember-me">
            <BootstrapForm.Check // prettier-ignore
              type="checkbox"
              id="remember-me"
              label="Запомнить меня"
              checked
            />
          </div>
          <Link
            className="login-form__forgot-password"
            to={routes.auth.resetPassword}
          >
            Забыли пароль?
          </Link>
        </div>
      }
      buttonSlot={
        <AuthLayout.Button
          text="Войти"
          disabled={pending}
        />
      }
      link={link}
      onSubmit={submited}
    >
      <Row className="custom-row">
        <Col xs={12}>
          <Form.Input
            label="Email"
            placeholder="Введите E-Mail"
            value={email}
            onChange={emailChanged}
          />
        </Col>
        <Col xs={12}>
          <Form.Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={passwordChanged}
          />
        </Col>
      </Row>
    </AuthLayout.Form>
  )
}

export const MemoLoginForm = memo(LoginForm)
