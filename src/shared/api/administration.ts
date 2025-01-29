import { createEffect } from "effector";
import { request } from "./request";

const giveUserFx = createEffect(({ login }: { login: string }) => {
    return request<unknown, { login: string }>('tickets/give-user', {
        method: 'POST',
        data: { login: login }
    })
})

const giveActiveUsersFx = createEffect(() => {
    return request<unknown, unknown>('tickets/give-active-users', {
        method: 'POST',
    })
})

const giveAllUsersFx = createEffect(() => {
    return request<unknown, unknown>('tickets/give-all-users', {
        method: 'POST',
    })
})

const giveUsersRegisteredAfterFx = createEffect(({ created_after }: { created_after: string }) => {
    return request<unknown, { created_after: string }>('tickets/give-users-registered-after', {
        method: 'POST',
        data: { created_after: created_after }
    })
})

const exportTicketsFx = createEffect(() => {
    return request<unknown, unknown>('tickets/export', {
        method: 'POST'
    })
})

export const administrationApi = {
    giveUserFx,
    giveActiveUsersFx,
    giveAllUsersFx,
    giveUsersRegisteredAfterFx,
    exportTicketsFx
}