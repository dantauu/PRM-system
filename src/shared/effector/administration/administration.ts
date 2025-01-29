import { administrationApi } from "@/shared/api/administration"
import { attach, createEvent, createStore, sample } from "effector"

const giveUserFx = attach({ effect: administrationApi.giveUserFx })
const giveUsersRegisteredAfterFx = attach({ effect: administrationApi.giveUsersRegisteredAfterFx })
const giveAllUsersFx = attach({ effect: administrationApi.giveAllUsersFx })
const giveActiveUsersFx = attach({ effect: administrationApi.giveActiveUsersFx })
const exportTicketsFx = attach({ effect: administrationApi.exportTicketsFx })

const $toAccruedUser = createStore<string>('')
const $regAfter = createStore<string>('')
const setToAccruedUser = createEvent<string>()
const setRegAfter = createEvent<string>()

$toAccruedUser.on(setToAccruedUser, (_, value) => value)
$regAfter.on(setRegAfter, (_, value) => value)

const submitedGiveUser = createEvent()
const submitedGiveActiveUsers = createEvent()
const submitedGiveAllUsers = createEvent()
const submitedGiveUsersRegisteredAfter = createEvent<string>()
const submitedExportTickets = createEvent()

sample({
    clock: submitedGiveUser,
    source: { login: $toAccruedUser },
    target: giveUserFx
})

sample({
    clock: submitedGiveUsersRegisteredAfter,
    fn: (params) => ({created_after: params}),
    target: giveUsersRegisteredAfterFx
})

sample({
    clock: submitedGiveAllUsers,
    target: giveAllUsersFx
})

sample({
    clock: submitedGiveActiveUsers,
    target: giveActiveUsersFx
})

sample({
    clock: submitedExportTickets,
    target: exportTicketsFx
})

export const $$administration = {
    $toAccruedUser,
    setToAccruedUser,
    $regAfter,
    setRegAfter,
    submitedGiveUser,
    submitedGiveActiveUsers,
    submitedGiveAllUsers,
    submitedGiveUsersRegisteredAfter,
    submitedExportTickets
}