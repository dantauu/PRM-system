
import { useUnit } from "effector-react";
import React, { FC, } from "react";
import { ModalCloseIcon } from "@/shared/assets";
import "./styles.scss"
import { Blob } from '../blob/ui'
import { Button } from "../buttons";
import { $isModalOpen, openModal, closeModal } from "@/shared/effector/lottery-tickets/modal-status";
import { $$lotteryTickets } from "@/shared/effector/lottery-tickets/lottery-tickets";

interface Props {

}

export const ModalLotteryTickets: FC<Props> = ({ }) => {

    const [isOpenModal, open, close] = useUnit([$isModalOpen, openModal, closeModal])
    const [tickets] = useUnit([$$lotteryTickets.$tickets]) // сейчас возвращает пустой массив
    // console.log("tickets", tickets)
    // const tickets = ['билет 1', 'билет 2', 'билет 3', 'билет 4', 'билет 5', 'билет 6', 'билет 7', 'билет 8', 'билет 9']

    return (<div
        className={isOpenModal ? 'modall open' : 'modall close'}
        onClick={close}
    >
        <div
            className="modal-content"
            onClick={(e) => {
                e.stopPropagation()
            }}
        >
            <div
                onClick={close}
                className="icon-close"
            >
                <ModalCloseIcon
                    width={51}
                    height={51}
                    className="icon-modal"
                />
            </div>

            <Blob image={'BlobWebpBlue'} />

            <p className='title-promocode'>У вас {tickets.length} уникальных номеров</p>
            <p className="text-promocode">Подробнее смотрите в нашем telegram канале</p>

            <div className='scrolling-area'>
                {tickets && tickets.length > 0 && tickets.map(ticket => <p key={ticket} className='ticket-item'>{ticket}</p>)}
            </div>
        </div>
    </div>)
}