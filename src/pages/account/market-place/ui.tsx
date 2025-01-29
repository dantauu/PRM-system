// марсектплейс - вся страница
import './style.scss'
import { Strategy } from '@/shared/api'
import { $$basicStrategy } from '@/shared/effector'
import { marketplace } from '@/shared/effector/marketplace/shop-items'
import { useMediaQuery } from '@/shared/hooks'
import {
  MemoMarketPlaceActivity,
  MemoMarketPlaceIntro,
  MemoMarketPlaceStrategies,
} from '@/widgets/market-place'
import { MarketPlaceRefPackages } from '@/widgets/market-place/market-place-ref-packages'
import { MemoMainProfileWidgets } from '@/widgets/profile'
import { useUnit } from 'effector-react'
import { useEffect, useLayoutEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

const MarketPlacePage = () => {
  const isMobile = useMediaQuery('screen and (max-width: 425px)')

  const [items, submited] = useUnit([
    $$basicStrategy.getAll.$items,
    $$basicStrategy.getAll.submited,
  ])

  const mockItems: Strategy[] = [
    { id: 1, name: 'Start' },
    { id: 2, name: 'Basic' },
    { id: 3, name: 'Middle' },
    { id: 4, name: 'Max' },
  ]

  // console.log("items", items)

  const [shopItems] = useUnit([marketplace.$shopItems])

  // console.log("shopItems", shopItems)

  // фильтровать shopItems по shop_item_type_id - activity (1), editor (2), strategy (3)

  const strategies = shopItems.filter((item) => item.shop_item_type_id === 3)

  useLayoutEffect(() => submited(), [submited])

  useEffect(() => {
    marketplace.getItemsFx('')
  }, [])

  return (
    <Row className="custom-row">
      <Col xs={12}>
        <MemoMainProfileWidgets />
      </Col>

      {isMobile ? null : (
        <Col xs={12}>
          <MemoMarketPlaceIntro />
        </Col>
      )}

      <div
        className="market-place-activity"
        id="activityPackages"
      >
        <div className="market-place-activity__header">
          <div className="market-place-activity__title">Активность PRM</div>
          <MarketPlaceRefPackages />
        </div>
        <MemoMarketPlaceActivity activity={mockItems} />
      </div>

      <Col
        xs={12}
        id="strategyPackages"
      >
        <MemoMarketPlaceStrategies strategies={strategies} />
      </Col>
    </Row>
  )
}

export default MarketPlacePage
