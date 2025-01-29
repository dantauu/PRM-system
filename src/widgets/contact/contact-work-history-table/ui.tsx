// Блок История действий

import { $$activeContactCommunications } from './model'
import './style.scss'
import { Communication } from '@/shared/api'
import { NoTableData, PageLayout } from '@/shared/components'
import { $$activeStrategy, $$communicationType } from '@/shared/effector'
import { useTableTheme } from '@/shared/hooks'
import { myMoment } from '@/shared/tools'
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { CSSProperties, FC, memo, useMemo } from 'react'

interface ContactWorkHistoryTableProps {
  className?: string
}

type CommunicationForTable = Communication & {
  id: number
  communicationType: string
  result: string
}

export const ContactWorkHistoryTable: FC<ContactWorkHistoryTableProps> = ({ className }) => {
  // Effector
  const maxHeight = useUnit($$activeContactCommunications.$maxHeight)
  const communications = useUnit($$activeContactCommunications.$items)
  const communicationTypes = useUnit($$communicationType.getAll.$items)
  const stepResults = useUnit($$activeStrategy.$stepResults)

  const nodes = useMemo<CommunicationForTable[]>(
    () =>
      communications.map((item) => ({
        ...item,
        id: item.communications_id,
        communicationType:
          communicationTypes.find(
            (typeItem) => typeItem.communication_type_id === item.communication_type_id
          )?.name || '',
        result:
          stepResults.find(
            (result) =>
              result.custom_strategy_step_result_id === item.custom_strategy_step_result_id
          )?.result_name || '',
      })),
    [communicationTypes, communications, stepResults]
  )

  const isEmpty = !communications.length
  const data = { nodes }

  // Hooks
  const theme = useTableTheme({
    columns: {
      base: 'repeat(4, 25%)',
      tablet: 'repeat(4, 40%)',
      mobile: 'repeat(4, 70%)',
    },
    isNoData: isEmpty,
  })

  // Variables
  const ClassName = classNames('contact-work-history-table', className)
  const style = useMemo(() => ({ '--max-height': `${maxHeight}px` }) as CSSProperties, [maxHeight])

  return (
    <PageLayout.Cloud
      className={ClassName}
      style={style}
      header={{ title: 'История действий' }}
    >
      <Table
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
        data={data}
      >
        {(items: CommunicationForTable[]) =>
          !isEmpty ? (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Дата</HeaderCell>
                  <HeaderCell>Действие</HeaderCell>
                  <HeaderCell>Результат</HeaderCell>
                  <HeaderCell>Комментарий</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {items.map((item) => (
                  <Row
                    key={item.communications_id}
                    className="clickable-row"
                    item={item}
                  >
                    <Cell>{myMoment(item.date).format(myMoment.defaultViewFormat)}</Cell>
                    <Cell>{item.communicationType}</Cell>
                    <Cell>{item.result}</Cell>
                    <Cell>{item.comment}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          ) : (
            <NoTableData />
          )
        }
      </Table>
    </PageLayout.Cloud>
  )
}

export const MemoContactWorkHistoryTable = memo(ContactWorkHistoryTable)
