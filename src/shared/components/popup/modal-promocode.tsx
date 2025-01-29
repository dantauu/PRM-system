import { $isModalOpen, openModal, closeModal } from "@/shared/effector/promocode/modal-status";
import { useUnit } from "effector-react";
import React, { FC, } from "react";
import { ModalCloseIcon } from "@/shared/assets";
import "./styles.scss"
import { Blob } from '../blob/ui'
import { Button } from "../buttons";
import { $$alerts, $$session } from "@/shared/effector";
import { $$promocode } from "@/shared/effector/promocode/promocode";

interface Props {

}

export const ModalPromocode: FC<Props> = ({ }) => {

    // const profile = useUnit($$session.$profile)
    // console.log("profile", profile)

    const [value, setValue] = useUnit([
        $$promocode.$value,
        $$promocode.valueChanged
    ])

    const [submited] = useUnit([$$promocode.submited])
    const [isOpenModal, open, close] = useUnit([$isModalOpen, openModal, closeModal])
    const showAlertDanger = useUnit($$alerts.showDanger)

    const handleClickButton = () => {
        if (!value) {
            showAlertDanger("Введите промокод")
        } else {
            submited()
        }
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

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

            <p className="title-promocode">Введите промокод</p>

            <input
                className="modal-content-input-promocode"
                value={value}
                onChange={(event) => handleChangeInput(event)}
            />
            <Button
                className="modal-content-button-promocode"
                variant="primary"
                onClick={handleClickButton}
            >
                Применить
            </Button>

        </div>
    </div>)
}