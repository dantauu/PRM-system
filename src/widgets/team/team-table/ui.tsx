import { TeamItem } from '@/shared/api'
import { Form, NoTableData, PageLayout } from '@/shared/components'
import { $$team } from '@/shared/effector'
import { useTableTheme } from '@/shared/hooks'
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Table,
  Row as TableRow,
} from '@table-library/react-table-library'
import { useUnit } from 'effector-react'
import { FC, memo, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'

const showCountSelect = [
  { value: 10, text: 'Показывать по 10 записей' },
  { value: 25, text: 'Показывать по 25 записей' },
  { value: 50, text: 'Показывать по 50 записей' },
]

type TableTeamItem = Omit<TeamItem, 'userId'> & { id: number }

export const TeamTable: FC = () => {
  // Effector
  const team = useUnit($$team.$items)

  // console.log("team", team)

  const isEmpty = !team.length

  // console.log("isEmpty", isEmpty)

  // const teamteam = [
  //   {
  //     userId: 0,
  //     login: "Снуп",
  //     name: "Кирилл",
  //     surname: "Кириллов",
  //     city: "Москва",
  //     country: "Россия",
  //     phone: "88888888888",
  //     telegram: "Снуп",
  //     activeDate: "2024-06-18T10:41:42.106Z",
  //     firstLine: 0,
  //     trade: 0,
  //     struct: "string"
  //   }
  // ]

  // Hooks
  const theme = useTableTheme({
    columns: {
      // base: 'repeat(10, 25%)',
      // tablet: 'repeat(10, 40%)',
      // mobile: 'repeat(10, 70%)',
      base: 'auto auto auto auto auto auto auto auto auto auto',
      tablet: 'auto auto auto auto auto auto auto auto auto auto',
      mobile: 'auto auto auto auto auto auto auto auto auto auto',
    },
    isNoData: isEmpty,
  })

  // Memo
  const data = useMemo(
    () => ({ nodes: team.map(({ userId, ...data }) => ({ id: userId, ...data })) || [] }),
    [team]
  )

  return (
    <PageLayout.Cloud
      header={{ title: 'Моя команда' }}
    >
      <Table
        theme={theme}
        layout={{ custom: true, horizontalScroll: !isEmpty }}
        data={data}
      >
        {(items: TableTeamItem[]) =>
          !isEmpty ? (
            <>
              <Header>
                <HeaderRow
                >
                  <HeaderCell>ФИО</HeaderCell>
                  <HeaderCell>login</HeaderCell>
                  <HeaderCell>Телефон</HeaderCell>
                  <HeaderCell>Telegram</HeaderCell>
                  <HeaderCell>Активен</HeaderCell>
                  <HeaderCell>В первой линии</HeaderCell>
                  <HeaderCell>В структуре</HeaderCell>
                  <HeaderCell>Товарооборот</HeaderCell>
                  <HeaderCell>Страна</HeaderCell>
                  <HeaderCell>Город</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                  >
                    <Cell>{`${item.name} ${item.surname}`}</Cell>
                    <Cell>{item.login}</Cell>
                    <Cell>{item.phone}</Cell>
                    <Cell>{item.telegram}</Cell>
                    <Cell>{item.activeDate}</Cell>
                    <Cell>{item.firstLine}</Cell>
                    <Cell>{item.struct}</Cell>
                    <Cell>{item.trade}</Cell>
                    <Cell>{item.country}</Cell>
                    <Cell>{item.city}</Cell>
                  </TableRow>
                ))}
              </Body>
            </>
          ) : (
            <NoTableData />
          )
        }
      </Table>

      <Row style={{ marginTop: '12px' }}>
        <Col
          xs={12}
          md={6}
          lg={3}
        >
          <Form.Select
            size="sm"
            items={showCountSelect}
          />
        </Col>
      </Row>
    </PageLayout.Cloud>
  )
}

export const MemoTeamTable = memo(TeamTable)
