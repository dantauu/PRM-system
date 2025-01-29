import { NoTableData } from '../components'
import { useMediaQuery } from './use-media-query'
import { useTheme } from '@table-library/react-table-library/theme'

interface UseTableThemeOptions {
  columns: {
    // Default
    base: string
    // Less 1200
    laptop?: string
    // Less 768
    tablet?: string
    // Less 425
    mobile?: string
  }
  isNoData?: boolean
}

export const useTableTheme = ({ columns: columnsSizes, isNoData }: UseTableThemeOptions) => {
  // Hooks
  const isLess1200 = useMediaQuery('screen and (max-width: 1200px)')
  const isLess768 = useMediaQuery('screen and (max-width: 768px)')
  const isLess425 = useMediaQuery('screen and (max-width: 425px)')

  // Variables
  const columns = isNoData
    ? NoTableData.size
    : isLess425 && columnsSizes.mobile
      ? columnsSizes.mobile
      : isLess768 && columnsSizes.tablet
        ? columnsSizes.tablet
        : isLess1200 && columnsSizes.laptop
          ? columnsSizes.laptop
          : columnsSizes.base

  // console.log("columns", columns)
  // console.log("isNoData", isNoData)

  const editCellAbsolute = `
    right: 0px;    
    border-left: 1px solid var(--line-one);
  `

  return useTheme({
    Table: `
      --data-table-library_grid-template-columns:  ${columns};

      &::-webkit-scrollbar {
        height: 12px;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background: var(--scrollbar-color-line);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        background: var(--background-color-four);
      }
    `,
    HeaderRow: `
      background-color: var(--background-color-four);
    `,
    HeaderCell: `
      padding: 12px 12px;
      border-bottom: 1px solid var(--line-one);

      color: var(--nav-list-disable);
      font-family: DM Sans, sans-serif;
      font-size: 14px;
      font-weight: 400;

      &.edit-header-cell {
        ${!isLess768 ? editCellAbsolute : ''}
      }
    `,
    Row: `
      background-color: var(--background-color-four);

      &.clickable-row:hover {
        background-color: var(--background-color-three);

        cursor: pointer;
      }
    `,
    Cell: `
      padding: 12px 12px;

      color: var(--blue-first);
      font-family: DM Sans, sans-serif;
      font-size: 14px;
      font-weight: 700;
      
      &.edit-cell {
        ${!isLess768 ? editCellAbsolute : ''}

        cursor: pointer;
      }

      &.edit-cell:hover {
        color: var(--text-color-three);
      }
    `,
  })
}
