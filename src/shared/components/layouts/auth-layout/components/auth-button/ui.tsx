import './style.scss';
import classNames from 'classnames';
import { FC, memo } from 'react';


interface AuthButtonProps {
  className?: string
  text: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const AuthButton: FC<AuthButtonProps> = ({ className, text, disabled, onClick }) => {
  // Variables
  const ClassName = classNames('auth-button', { 'auth-button--disabled': disabled }, className)

  return (
    <button
      type="submit"
      className={ClassName}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export const MemoAuthButton = memo(AuthButton)