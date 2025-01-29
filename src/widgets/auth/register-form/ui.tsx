import './style.scss'
import { AuthLayout, Form as MyForm } from '@/shared/components'
import { $$registerForm } from '@/shared/effector'
import { openModal } from '@/shared/effector/profile/modal-welcome-status'
import { routes } from '@/shared/router'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

interface RegisterFormProps {
  className?: string
}

const link = {
  beforeLink: 'Уже есть аккаунт?',
  text: 'Войти',
  to: routes.auth.login,
}

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
  // Effector
  const [
    firstName,
    lastName,
    login,
    email,
    phone,
    password,
    confirmPassword,
    parentLogin,
    termsReaded,
  ] = useUnit([
    $$registerForm.$firstName,
    $$registerForm.$lastName,
    $$registerForm.$login,
    $$registerForm.$email,
    $$registerForm.$phone,
    $$registerForm.$password,
    $$registerForm.$confirmPassword,
    $$registerForm.$parentLogin,
    $$registerForm.$termsReaded,
  ])

  const [
    firstNameChanged,
    lastNameChanged,
    loginChanged,
    emailChanged,
    phoneChanged,
    passwordChanged,
    confirmPasswordChanged,
    parentLoginChanged,
    termsReadedChanged,
  ] = useUnit([
    $$registerForm.firstNameChanged,
    $$registerForm.lastNameChanged,
    $$registerForm.loginChanged,
    $$registerForm.emailChanged,
    $$registerForm.phoneChanged,
    $$registerForm.passwordChanged,
    $$registerForm.confirmPasswordChanged,
    $$registerForm.parentLoginChanged,
    $$registerForm.termsReadedChanged,
  ])

  const [canSubmit] = useUnit([$$registerForm.$canSubmit])

  const [opened, reseted] = useUnit([$$registerForm.opened, $$registerForm.reseted])
  const [submited, pending] = useUnit([$$registerForm.submited, $$registerForm.$pending])

  const [open] = useUnit([openModal])

  // Variables
  const ClassName = classNames('register-form', className)

  // Effect
  useEffect(() => {
    opened()
    return () => reseted()
  }, [opened, reseted])

  return (
    <AuthLayout.Form
      className={ClassName}
      title="Регистрация"
      subtitle="Добро пожаловать в PRM4ALL!"
      underForm={
        <div className="register-form__terms">
          <Form.Check
            className="checkbox"
            checked={termsReaded}
            onClick={() => termsReadedChanged(!termsReaded)}
          />
          <div>
            Я прочитал{' '}
            <a
              href="https://prm4all.gitbook.io/prm4all/v/whitepaper-prm4all-v-1.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhitePaper
            </a>{' '}
            и принимаю все условия и политики компании.
          </div>
        </div>
      }
      buttonSlot={
        <Row className="custom-row">
          <Col
            xs={12}
            md={6}
          >
            <AuthLayout.Button
              text="Зарегистрироваться"
              disabled={pending || !canSubmit}
              onClick={() => {
                localStorage.removeItem('is-first-loading')
                open()
              }}
            />
          </Col>
        </Row>
      }
      link={link}
      onSubmit={submited}
    >
      <Row className="custom-row">
        <Col
          xs={12}
          md={6}
        >
          <Row className="custom-row">
            <Col xs={12}>
              <MyForm.Input
                name="firt-name"
                label="Имя"
                placeholder="Введите имя"
                value={firstName}
                onChange={firstNameChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                name="last-name"
                label="Фамилия"
                placeholder="Введите фамилию"
                value={lastName}
                onChange={lastNameChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                name="login"
                label="Login"
                placeholder="Login"
                value={login}
                onChange={loginChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                type="telephone"
                name="contact-phone"
                label="Телефон"
                placeholder="+7 (XXX) XXX XX XX"
                value={phone}
                onChange={phoneChanged}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          md={6}
        >
          <Row className="custom-row">
            <Col xs={12}>
              <MyForm.Input
                name="email"
                label="Email"
                placeholder="mail@gmail.com"
                value={email}
                onChange={emailChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                type="password"
                label="Пароль"
                placeholder="*********"
                value={password}
                onChange={passwordChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                type="password"
                label="Повторите пароль"
                placeholder="*********"
                value={confirmPassword}
                onChange={confirmPasswordChanged}
              />
            </Col>
            <Col xs={12}>
              <MyForm.Input
                name="parent-login"
                label="Вас пригласил"
                placeholder="Skysadko"
                value={parentLogin}
                onChange={parentLoginChanged}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </AuthLayout.Form>
  )
}

export const MemoRegisterForm = memo(RegisterForm)
