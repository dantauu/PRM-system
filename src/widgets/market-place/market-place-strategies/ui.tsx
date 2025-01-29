// Страница маркетплейс, блок под банером - стратегии
import './style.scss'
import { MemoStrategyItemLayout } from '@/entities/strategy'
import { MemoLikeStrategyButton } from '@/features/strategy'
import { BasicStrategy } from '@/shared/api'
import { Button, HorizontalScrollableItems } from '@/shared/components'
import useBuyItem from '@/shared/hooks/marketplace/use-buy-item'
import { IShopItem } from '@/types/shop-items'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface MarketPlaceStrategiesProps {
  className?: string

  // strategies: BasicStrategy[]
  strategies: IShopItem[]
}

export const MarketPlaceStrategies: FC<MarketPlaceStrategiesProps> = ({
  className,
  strategies,
}) => {
  // Variables
  const ClassName = classNames('market-place-strategies', className)

  // console.log("strategies на странице маркет плейс", strategies)

  const handleBuyClick = (amount: number) => {
    console.log('купил')

    // useBuyItem(amount.toString())
  }

  return (
    <>
      {/* <HorizontalScrollableItems<BasicStrategy> */}
      <HorizontalScrollableItems<IShopItem>
        className={ClassName}
        title="Готовые стратегии"
        items={strategies}
        renderItem={(item) => (
          <MemoStrategyItemLayout
            // key={item.basic_strategy_id}
            image={item.image}
            key={item.shop_item_id}
            className="market-place-strategies__item"
            title={item.name}
            // subtitle="1 стратегия"
            subtitle={item.description}
            likeButtonSlot={<MemoLikeStrategyButton />}
            // leftButtonSlot={<div className="market-place-strategies__item-price">Цена: $15</div>}
            leftButtonSlot={
              <div className="market-place-strategies__item-price">Цена: ${item.price}</div>
            }
            rightButtonSlot={
              <Button
                onClick={() => handleBuyClick(item.price)}
                circle
              >
                Купить
              </Button>
            }
          />
        )}
      />
    </>
  )
}

export const MemoMarketPlaceStrategies = memo(MarketPlaceStrategies)
