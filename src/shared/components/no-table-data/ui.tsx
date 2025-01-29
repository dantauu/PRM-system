import './style.scss'
import { Body, Cell, Row } from '@table-library/react-table-library'
import { FC, memo } from 'react'

export const NoTableData: FC = () => {
  return (
    <Body>
      <Row item={{ id: 1 }}>
        <Cell>
          <div className="no-table-data">Данные отсутствуют</div>
        </Cell>
      </Row>
    </Body>
  )
}

export const MemoNoTableData = memo(NoTableData)
