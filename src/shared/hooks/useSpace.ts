export function useSpace(value: number | string): string {
  let res
  let str
  if (typeof value === 'number') {
    str = String(value)
  } else {
    str = value
  }

  str.indexOf(',') != -1
    ? (res = new Intl.NumberFormat('ru-RU')
        .format(parseFloat(str.replace(',', '.')))
        .replace('.', ','))
    : (res = new Intl.NumberFormat('ru-RU').format(parseFloat(str)).replace(',', '.'))
  return res
}
