import { createEffect } from "effector";
import { request } from "./request";

export const getLotteryTicketsFx = createEffect(() => {
    // console.log("выполнился запрос лотерейные биллеты")
    return request<unknown, string[]>('tickets/my', { method: 'GET' })
})