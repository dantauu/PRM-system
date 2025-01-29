import { Event, createEvent, createStore } from 'effector'
import { debug, reset } from 'patronum'

interface CacheParams {
  name: string

  reset?: Event<void>

  useDebug?: boolean
}

type CacheMap<Item, Key extends string | number> = Record<Key, Item>
type CacheAdded<Item, Key extends string | number> = { key: Key; item: Item }
type CacheUpdated<Item, Key extends string | number> = { key: Key; item: Item }
type CacheRemoved<Key extends string | number> = { key: Key }

export function CacheFactory<Item, Key extends string | number = number>({
  name,
  reset: reseted,
  useDebug,
}: CacheParams) {
  const getName = (unit: string) => `cache ${name} ${unit}`

  //* Stores
  const $cache = createStore<CacheMap<Item, Key>>({} as CacheMap<Item, Key>, {
    name: getName('map'),
  })

  //* Events
  const cacheAdded = createEvent<CacheAdded<Item, Key>>(getName('added'))
  const cacheUpdated = createEvent<CacheUpdated<Item, Key>>(getName('updated'))
  const cacheRemoved = createEvent<CacheRemoved<Key>>(getName('removed'))
  const cacheReseted = createEvent(getName('reseted'))

  //* Logic
  $cache.on(cacheAdded, (items, { key, item }) => ({ ...items, [key]: item }))
  $cache.on(cacheUpdated, (items, { key, item }) => ({ ...items, [key]: item }))
  $cache.on(cacheRemoved, (items, { key }) => {
    const newItems = { ...items }
    delete newItems[key]
    return newItems
  })

  reset({
    clock: [cacheReseted, reseted].filter(Boolean),
    target: [$cache],
  })

  if (useDebug) {
    debug($cache, cacheAdded, cacheUpdated, cacheRemoved, cacheReseted)
  }

  //* Utils
  const hasItem = (items: CacheMap<Item, Key>, key: Key) => key in items
  const getItem = (items: CacheMap<Item, Key>, key: Key) => items[key] ?? null

  return {
    $cache,

    cacheAdded,
    cacheUpdated,
    cacheRemoved,
    cacheReseted,

    hasItem,
    getItem,
  }
}

export type Cache<Item, Key extends string | number = number> = ReturnType<
  typeof CacheFactory<Item, Key>
>
