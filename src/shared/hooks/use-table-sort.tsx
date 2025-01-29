import { SortButton } from './../components/sort-button/ui'
import { Data, TableNode } from '@table-library/react-table-library'
import { SortFn, useSort } from '@table-library/react-table-library/sort'
import { MiddlewareFunction } from '@table-library/react-table-library/types/common'

function onSortChange() {}

export const useTableSort = <Item extends TableNode>(
  data: Data<Item>,
  sortFns: Record<string, SortFn>,
  onChange: MiddlewareFunction = onSortChange
) =>
  useSort(
    data,
    {
      onChange,
    },
    {
      sortIcon: {
        iconDefault: <SortButton />,
        iconUp: <SortButton sort="ASC" />,
        iconDown: <SortButton sort="DESC" />,
      },
      sortFns,
    }
  )
