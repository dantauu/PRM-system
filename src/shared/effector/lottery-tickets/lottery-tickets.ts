import { getLotteryTicketsFx } from "@/shared/api/lottery-ticket";
import { attach, createStore, sample } from "effector";

const getTicketsFx = attach({effect: getLotteryTicketsFx})

const $tickets = createStore<string[]>([])
$tickets.on(getTicketsFx.doneData, (_, payload) => payload)

export const $$lotteryTickets = {
    getTicketsFx,
    $tickets
}