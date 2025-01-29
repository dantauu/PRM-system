import { createEvent, createStore } from "effector";


const $selectedOption = createStore({valueStatus: null, value: null, text:''})
const selectedOptionChanged = createEvent<{valueStatus: number | null, value: number | null, text:string}>()

$selectedOption.on(selectedOptionChanged, (_, payload) => ({valueStatus:payload.valueStatus, value: payload.value, text: payload.text}))

const $statusId = createStore<number | null>(null)

export const $$dropdown = {
    $selectedOption,
    selectedOptionChanged
}