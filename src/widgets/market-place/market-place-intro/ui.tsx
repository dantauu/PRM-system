// Страница маркетплейс, блок с банером

import './style.scss'
// import MarketPlaceBannerImage from '@/shared/assets/images/market-place-banner.webp'
import MarketPlaceBannerImage from '@/shared/assets/images/market-place-banner3.webp'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface MarketPlaceIntroProps {
  className?: string
}

export const MarketPlaceIntro: FC<MarketPlaceIntroProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('market-place-intro', className)

  return (
    <div className={ClassName}>
      <div className="market-place-intro__bg-wrapper">
        <img
          src={MarketPlaceBannerImage}
          className="market-place-intro__bg-image"
        />
      </div>
      <div className="market-place-intro__text">
        <div className="market-place-intro__title">Приобретай эффективные стратегии!</div>
        <div className="market-place-intro__subtitle">И зарабатывай вместе с профессионалами!</div>
      </div>
      <div className="market-place-intro__buttons">
        <button className="market-place-intro__white-button">За покупками</button>
      </div>
    </div>
  )
}

export const MemoMarketPlaceIntro = memo(MarketPlaceIntro)
