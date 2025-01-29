import { activatePromocodeFx } from "@/shared/api/promocode";
import { attach, createEvent, createStore, sample } from "effector";
import { $$alerts } from "../alerts";

const activateFx = attach({ effect: activatePromocodeFx })

const $value = createStore('')
const valueChanged = createEvent<string>()

const submited = createEvent()

$value.on(valueChanged, (_, value) => value)

sample({
    clock: submited,
    source: {
        promocode: $value // передаем параметр для activateFx
    },
    target: activateFx,
})

sample({
    clock: activateFx.done,
    fn: () => 'Промокод принят',
    target: $$alerts.showSuccess,
})

sample({
    clock: activateFx.failData,
    fn: () => 'Промокод не применился',
    target: $$alerts.showDanger,
  })

export const $$promocode = {
    activateFx,
    $value,
    valueChanged,
    submited
}