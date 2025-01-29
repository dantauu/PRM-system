import './style.scss'
import BlobImage from '@/assets/landing/images/bl2.gif'
import MacbookImage from '@/assets/landing/images/macbook.png'
import MobileImage from '@/assets/landing/images/mobile.png'
import { RunningLine } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'
import { useMediaQuery } from '@/shared/hooks'

export const CreateYourStrategies = () => {
  // Hooks
  const isMobile = useMediaQuery('screen and (max-width: 425px)')

  return (
    <>
      <LandingLayout.Section
        className="create-your-strategies"
        useDefaultMT
      >
        <LandingLayout.Section
          className="create-your-strategies__running-line"
          noMargin
        >
          <RunningLine
            text="marketplace"
            title={
              <>
                Создавайте свои стратегии
                {!isMobile ? <br /> : ' '}
                по развитию бизнеса и масштабируйте их
              </>
            }
          />
        </LandingLayout.Section>
      </LandingLayout.Section>

      <LandingLayout.Section className="create-your-strategies__laptop">
        <div className="create-your-strategies__mobile">
          <img
            src={MobileImage}
            alt="mobile"
          />
        </div>

        <img
          className="create-your-strategies__macbook"
          src={MacbookImage}
          alt="macbook"
        />

        <div className="create-your-strategies__blob">
          <img
            className="create-your-strategies__blob-img"
            src={BlobImage}
            alt="blob"
          />
        </div>
      </LandingLayout.Section>
    </>
  )
}
