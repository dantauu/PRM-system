export enum Sort {
  None,
  ASC,
  DESC,
}

export interface TableSort<Entity, FieldSort = keyof Entity> {
  field?: FieldSort
  sort: Sort
}

export interface ColumnType<Entity, Name = keyof Entity | string> {
  name: Name
  title: string
  compute?: (value: Entity) => string
  sortable?: boolean
}

export interface TableType<Entity> {
  columns: ColumnType<Entity>[]
  data: Entity[]
}

export interface HeadType<Entity> {
  columns: ColumnType<Entity>[]
}

export interface RowType<Entity> {
  columns: ColumnType<Entity>[]
  entity: Entity
}
