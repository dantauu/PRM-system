// Блок История действий
import styles from './communication-history-table.module.scss'
import './style.scss'
import MenuDotsDark from '@/assets/account/images/menu-dots-dark.png'
import MenuDotsLight from '@/assets/account/images/menu-dots-light.png'
import { Communication, ContactWithInfo } from '@/shared/api'
import { NoTableData, PageLayout } from '@/shared/components'
import { $$communication } from '@/shared/effector'
import { $$contactCustomStrategyStatuses } from '@/shared/effector/contact/_statuses'
import { useTableTheme } from '@/shared/hooks'
import { routes } from '@/shared/router'
import { useTheme } from '@/shared/theme'
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
import { CSSProperties, FC, memo, useEffect, useMemo } from 'react'
import { Button } from 'react-bootstrap'

interface CommunicationHistoryTableProps {
  className?: string
}

type ContactForTable = Communication & {
  id: number
  status: string
}

export const CommunicationHistoryTable: FC<CommunicationHistoryTableProps> = ({ className }) => {
  // Effector
  const [communications] = useUnit([$$communication.getAll.$items])
  const statuses = useUnit($$contactCustomStrategyStatuses.$items)

  const nodes = useMemo<ContactForTable[]>(
    () =>
      communications
        ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((item) => ({
          ...item,
          id: item.communications_id,
          status:
            statuses.find((status) => item.contact_id === status.contact_id.contact_id)
              ?.custom_strategy_status_id.name || '',
        })),
    [communications]
  )

  const isEmpty = !communications.length
  const data = { nodes }

  // Hooks
  const tableTheme = useTableTheme({
    columns: {
      base: 'auto auto auto auto auto',
      tablet: 'auto auto auto auto auto',
      mobile: 'auto auto auto auto auto',
    },
    isNoData: isEmpty,
  })

  //Hooks
  const { theme } = useTheme()

  // Variables
  const ClassName = classNames('communication-history-table', className)
  const src = theme === 'light' ? MenuDotsLight : MenuDotsDark

  const handleClick = (item: ContactForTable) => {
    routes.account.contact.work.navigate({ params: { id: item.contact_id }, query: {} })
  }

  return (
    <PageLayout.Cloud
      className={ClassName}
      header={{
        title: 'История коммуникаций',
        right: (
          <Button className={styles.header_button}>
            <img
              className=""
              src={src}
              alt="menu-button"
            />
          </Button>
        ),
      }}
    >
      <Table
        theme={tableTheme}
        layout={{ custom: true, horizontalScroll: true }}
        data={data}
      >
        {(items: ContactForTable[]) =>
          !isEmpty ? (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>ФИО</HeaderCell>
                  <HeaderCell>Стратегия</HeaderCell>
                  <HeaderCell>Статус</HeaderCell>
                  <HeaderCell>Комментарий</HeaderCell>
                  <HeaderCell>Дата</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {items.map((item) => (
                  <Row
                    key={item.id}
                    className="clickable-row"
                    item={item}
                    onClick={() => handleClick(item)}
                  >
                    <Cell>
                      {item.contact_first_name} {item.contact_last_name}
                    </Cell>
                    <Cell>{item.custom_strategy_name}</Cell>
                    <Cell>{item.status}</Cell>
                    <Cell>{item.comment}</Cell>
                    <Cell>{myMoment(item.date).format(myMoment.defaultViewFormat)}</Cell>
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

export const MemoCommunicationHistoryTable = memo(CommunicationHistoryTable)
