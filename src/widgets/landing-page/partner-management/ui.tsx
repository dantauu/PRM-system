import './style.scss'
import LaptopImage from '@/assets/landing/images/laptop.png'
import { GradientTitle } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'

export const PartnerManagament = () => {
  // Render
  const renderImage = () => (
    <div className="partner-management__image">
      <img
        src={LaptopImage}
        alt="laptopAndMobail"
      />
    </div>
  )

  return (
    <LandingLayout.Section
      anchor="AboutProject"
      className="partner-management"
      useDefaultMT
    >
      <div className="partner-management__left">
        <div className="partner-management__title">
          <GradientTitle>PARTNER RELATIONSHIP MANAGEMENT</GradientTitle>
        </div>
        <div className="partner-management__text">
          PRM4ALL ваш верный партнер в повышении продуктивности и доходности. Забудьте о рутинных
          задачах, сфокусируйтесь на стратегии и дайте возможность вашим контактам приносить вам
          прибыль!
        </div>
      </div>

      <div className="partner-management__right">{renderImage()}</div>
    </LandingLayout.Section>
  )
}
