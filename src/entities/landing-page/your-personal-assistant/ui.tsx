import { RunningLine } from '../running-line'
import './style.scss'
import BlobImage from '@/assets/landing/images/bl2.gif'
import { LandingLayout } from '@/shared/components'
import classNames from 'classnames'
import { FC } from 'react'

interface YourPersonalAssistantProps {
  className?: string
}

export const YourPersonalAssistant: FC<YourPersonalAssistantProps> = ({ className }) => {
  // Varaibles
  const ClassName = classNames('your-personal-assistant', className)

  return (
    <div className={ClassName}>
      <div className="your-personal-assistant__text">
        Ваш
        <br />
        Виртуальный
        <br />
        Бизнес Ассистент
      </div>

      <div className="your-personal-assistant__blob">
        <img
          className="your-personal-assistant__blob-img"
          src={BlobImage}
          alt="blob"
        />
      </div>

      <LandingLayout.Section
        className="your-personal-assistant__running-line"
        noMargin
      >
        <RunningLine
          text="PRM4ALL"
          noOpacity
        />
      </LandingLayout.Section>
    </div>
  )
}
