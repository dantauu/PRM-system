import './style.scss'
import BlobImage from '@/assets/landing/images/bl2.gif'
import { AdvantagesList, RunningLine } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'
import AdvantagesItem from '@/types/AdvantagesItem'

const advantages: AdvantagesItem[] = [
  {
    id: 1,
    image: BlobImage,
    imageClassName: 'coming-soon__open-ai-image',
    title: 'GPT-4 GENERATION',
    text: 'Ассистент полностью сам закрывать сделки! И приносит вам прибыль 24/7',
    lighting: 'mid',
  },
  {
    id: 2,
    image: BlobImage,
    imageClassName: 'coming-soon__voice-image',
    title: 'VOICE PRM',
    text: 'Ассистент совершает звонки, ведет диалог, подстраивается под ответы ведя клиента до закрытия сделки',
    lighting: 'mid',
  },
]

export const ComingSoon = () => {
  return (
    <LandingLayout.Section
      anchor="Token"
      className="coming-soon"
      useDefaultMT
    >
      <LandingLayout.Section
        className="coming-soon__running-line"
        noMargin
      >
        <RunningLine
          text="NEXT GENERATION"
          title="Скоро"
        />
      </LandingLayout.Section>

      <AdvantagesList
        className="coming-soon__items"
        items={advantages}
        noBoard
      />
    </LandingLayout.Section>
  )
}
