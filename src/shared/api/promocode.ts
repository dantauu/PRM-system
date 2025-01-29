import { createEffect } from "effector"
import { request } from "./request"

export const activatePromocodeFx = createEffect(({ promocode }: { promocode: string }) => {
    return request<unknown, { promocode: string }>('promocodes/activate', {
        method: 'POST',
        data: { promocode: promocode }
    })
})

// const activatePromocode = (async (promocode: string) => {
//     return await request<IActivatePromocodeReq, IActivatePromocodeRes>('promocodes/activate', {
//         method: 'POST',
//         data: { promocode: promocode }
//     })
// })
