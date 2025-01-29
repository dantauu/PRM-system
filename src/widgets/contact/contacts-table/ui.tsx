import './style.scss'
import { ExportContactsButton, ImportContactsButton } from '@/features/contact'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { ContactWithInfo } from '@/shared/api'
import { NoTableData, PageLayout, SortButton } from '@/shared/components'
import { $$contactCount, $$contacts } from '@/shared/effector'
import { $$contactDelete } from '@/shared/effector/contact/contact-delete'
import { useTableTheme } from '@/shared/hooks'
import { routes } from '@/shared/router'
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
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { CSSProperties, FC, SyntheticEvent, useMemo } from 'react'

function onSortChange() {}

interface ContactsTableProps {
  className?: string
}

type ContactForTable = Omit<ContactWithInfo, 'contact_id'> & { id: number }

export const ContactsTable: FC<ContactsTableProps> = ({ className }) => {
  const [contactIdChanged] = useUnit([$$contactDelete.contactIdChanged])

  const [submited] = useUnit([$$contactDelete.submited])

  // Effector
  const count = useUnit($$contactCount.$count)
  const contacts = useUnit($$contacts.$items)
  const isEmpty = !contacts.length
  const data = {
    nodes: contacts.map(({ contact_id, ...data }) => ({ id: contact_id, ...data })) || [],
  }

  // Hooks
  const theme = useTableTheme({
    columns: {
      // base: 'repeat(9,25%) auto',
      // tablet: 'repeat(9, 40%) auto',
      // mobile: 'repeat(9, 70%) auto',
      base: 'auto auto auto auto auto auto auto auto 140px auto',
      tablet: 'auto auto auto auto auto auto auto auto 140px auto',
      mobile: 'auto auto auto auto auto auto auto auto 140px auto',
    },
    isNoData: isEmpty,
  })

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: <SortButton />,
        iconUp: <SortButton sort="ASC" />,
        iconDown: <SortButton sort="DESC" />,
      },
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.first_name.localeCompare(b.first_name)),
      },
    }
  )

  // Handlers
  const handleClick = (item: ContactForTable) => {
    routes.account.contact.work.navigate({ params: { id: item.id }, query: {} })
  }
  const handleEdit = (event: SyntheticEvent, item: ContactForTable) => {
    event.stopPropagation()
    routes.account.contact.edit.navigate({ params: { contactId: item.id }, query: {} })
  }

  const handleDelete = (event: SyntheticEvent, item: ContactForTable) => {
    event.stopPropagation()
    contactIdChanged(item.id)
    submited()
  }

  // Variables
  const ClassName = classNames('contacts-table', className)

  return (
    <PageLayout.Cloud
      className={ClassName}
      headerClassName="contacts-list-header"
      contentClassName="contacts-list"
      header={{
        title: 'Контакты',
        subtitle: `Контактов: ${count}`,
        right: (
          <div className="contacts-list-header__buttons">
            <ExportContactsButton />
            <ImportContactsButton />
            <MemoActiveStrategySelect />
          </div>
        ),
      }}
    >
      <Table
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
        data={data}
        sort={sort}
      >
        {(items: ContactForTable[]) =>
          !isEmpty ? (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="NAME">ФИО</HeaderCellSort>
                  <HeaderCell>Телефон</HeaderCell>
                  <HeaderCell>Telegram</HeaderCell>
                  <HeaderCell>Профессия</HeaderCell>
                  <HeaderCell>Дата рождения</HeaderCell>
                  <HeaderCell>Примечание</HeaderCell>
                  <HeaderCell>Страна</HeaderCell>
                  <HeaderCell>Город</HeaderCell>
                  <HeaderCell
                    className="edit-header-cell main-edit-header"
                    pinRight
                  >
                    Редактировать
                  </HeaderCell>
                  <HeaderCell
                    className="edit-header-cell"
                    pinRight
                  >
                    Удалить
                  </HeaderCell>
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
                      {item.first_name} {item.last_name}
                    </Cell>
                    <Cell>{item.phone}</Cell>
                    <Cell>{item.telegram_ID}</Cell>
                    <Cell>{item.profession}</Cell>
                    <Cell>{myMoment(item.birth_date).format(myMoment.defaultViewFormat)}</Cell>
                    <Cell>{item.comment}</Cell>
                    <Cell>{item.country}</Cell>
                    <Cell>{item.city}</Cell>
                    <Cell
                      className="edit-cell main-edit"
                      onClick={(event) => handleEdit(event, item)}
                      pinRight
                    >
                      Редактировать
                    </Cell>
                    <Cell
                      className="edit-cell"
                      onClick={(event) => handleDelete(event, item)}
                      pinRight
                    >
                      Удалить
                    </Cell>
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
