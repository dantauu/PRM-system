import { ContactCloud } from '@/entities/contact'
import {
  MemoConnectContactButton,
  MemoEditContactButton,
  MemoLevelUpContactButton,
} from '@/features/contact'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { $$lastContact } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { FC } from 'react'

// import './style.scss'

interface Props {
  isSelect: boolean
}

export const LastContact: FC<Props> = ({ isSelect }) => {
  // Effector

  const contact = useUnit($$lastContact.$item)

  if (!contact) {
    return null
  }

  return (
    <ContactCloud
      title="Последний контакт"
      subtitle="С этим человеком вы недавно общались"
      contact={contact}
      strategySelectSlot={isSelect ? <MemoActiveStrategySelect /> : false}
      buttonsSlot={
        <>
          <MemoConnectContactButton contact={contact} />
          <MemoLevelUpContactButton contact={contact} />
          <MemoEditContactButton contact={contact} />
        </>
      }
    />
  )
}
