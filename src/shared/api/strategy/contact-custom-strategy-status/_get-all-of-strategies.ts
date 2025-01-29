import { getAll } from './_get-all'

interface GetAllOfStrategiesParams {
  ids: Array<number>
}

export const getAllOfStrategies = async ({ ids }: GetAllOfStrategiesParams) => {
  return Promise.all(ids.map((id) => getAll({ strategy_id: id })))
}
