import './style.scss'
import { FinanceHistoryItem } from '@/shared/api'
import { NoTableData, PageLayout } from '@/shared/components'
import { $$balanceHistory } from '@/shared/effector'
import { useTableTheme } from '@/shared/hooks'
import { useTableSort } from '@/shared/hooks/use-table-sort'
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
import { HeaderCellSort } from '@table-library/react-table-library/sort'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface BalanceHistoryTableProps {
  className?: string
}

const mockItems: FinanceHistoryItem[] = [
  {
    id: 1,
    sum: 100,
    type: 'Пополнение',
    login: 'hhrum',
    date: '2024-02-06T11:53:14.698Z',
  },
  {
    id: 2,
    sum: 1000,
    type: 'Пополнение',
    login: 'test',
    date: '2024-02-09T11:53:14.698Z',
  },
  {
    id: 3,
    sum: 10,
    type: 'Пополнение',
    login: 'hhrum',
    date: '2024-02-10T11:53:14.698Z',
  },
]

export const BalanceHistoryTable: FC<BalanceHistoryTableProps> = ({ className }) => {
  // Effector
  const history = useUnit($$balanceHistory.$items)
  //const history = mockItems
  const isEmpty = !history.length
  const data = { nodes: history || [] }

  // Hooks
  const theme = useTableTheme({
    columns: {
      base: 'repeat(4, 25%)',
      tablet: 'repeat(4, 40%)',
      mobile: 'repeat(4, 70%)',
    },
    isNoData: isEmpty,
  })

  const sort = useTableSort(data, {
    SUM: (items) => items.sort((a, b) => a.sum - b.sum),
    TYPE: (items) => items.sort((a, b) => a.type.localeCompare(b.type)),
    DATE: (items) => items.sort((a, b) => +myMoment(b.date).isBefore(myMoment(a.date))),
  })

  // Variables
  const ClassName = classNames('balance-history-table', className)

  return (
    <PageLayout.Cloud
      className={ClassName}
      header={{ title: 'История баланса' }}
    >
      <Table
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
        data={data}
        sort={sort}
      >
        {(items: FinanceHistoryItem[]) =>
          !isEmpty ? (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="SUM">Сумма $</HeaderCellSort>
                  <HeaderCellSort sortKey="TYPE">Тип</HeaderCellSort>
                  <HeaderCell>От кого</HeaderCell>
                  <HeaderCellSort sortKey="DATE">Дата</HeaderCellSort>
                </HeaderRow>
              </Header>
              <Body>
                {items.map((item) => (
                  <Row
                    key={item.id}
                    className="clickable-row"
                    item={item}
                  >
                    <Cell>{item.sum}</Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.login}</Cell>
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

export const MemoBalanceHistoryTable = memo(BalanceHistoryTable)
