import { landing } from '@/shared/api'
import { $$alerts, $$myLanding } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const updateFx = attach({ effect: landing.update })

const $phone = createStore('')
const $vk = createStore('')
const $instagram = createStore('')
const $telegram = createStore('')
const $youtube = createStore('')
const $about = createStore('')
const $youtubeVideo = createStore('')

const $pending = updateFx.pending

const $error = createStore<string | null>(null)

const phoneChanged = createEvent<string>()
const vkChanged = createEvent<string>()
const instagramChanged = createEvent<string>()
const telegramChanged = createEvent<string>()
const youtubeChanged = createEvent<string>()
const aboutChanged = createEvent<string>()
const youtubeVideoChanged = createEvent<string>()

const submited = createEvent()
const reseted = createEvent()

$phone.on(phoneChanged, (_, value) => value)
$vk.on(vkChanged, (_, value) => value)
$instagram.on(instagramChanged, (_, value) => value)
$telegram.on(telegramChanged, (_, value) => value)
$youtube.on(youtubeChanged, (_, value) => value)
$about.on(aboutChanged, (_, value) => value)
$youtubeVideo.on(youtubeVideoChanged, (_, value) => value)

// Submited
sample({
  clock: submited,
  source: {
    phone: $phone,
    vk: $vk,
    instagram: $instagram,
    telegram: $telegram,
    youtube: $youtube,
    about: $about,
    youtube_video: $youtubeVideo,
  },
  target: updateFx,
})

sample({
  clock: updateFx.done,
  fn: () => 'Успешно сохранено!',
  target: $$alerts.showSuccess,
})

// Fail
sample({
  clock: updateFx.failData,
  target: $error,
})

// Reset ??
sample({
  clock: $$myLanding.$item.updates,
  target: reseted,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.about || '',
  target: aboutChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.instagram || '',
  target: instagramChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.phone || '',
  target: phoneChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.telegram || '',
  target: telegramChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.vk || '',
  target: vkChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.youtube || '',
  target: youtubeChanged,
})

sample({
  clock: reseted,
  source: $$myLanding.$item,
  fn: (landing) => landing?.youtube_video || '',
  target: youtubeVideoChanged,
})

export const $$editLandingForm = {
  $phone,
  $vk,
  $instagram,
  $telegram,
  $youtube,
  $about,
  $youtubeVideo,
  $pending,

  phoneChanged,
  vkChanged,
  instagramChanged,
  telegramChanged,
  youtubeChanged,
  aboutChanged,
  youtubeVideoChanged,

  submited,
  reseted,
}
