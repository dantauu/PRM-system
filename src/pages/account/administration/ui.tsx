import { MemoButton, PageLayout } from '@/shared/components'
import { $$alerts } from '@/shared/effector'
import { $$administration } from '@/shared/effector/administration/administration'
import { useUnit } from 'effector-react'
import styles from "./administration.module.scss"

const AdministrationPage = () => {

  const [toAccruedUser, setToAccruedUser, regAfter, setRegAfter] = useUnit([$$administration.$toAccruedUser, $$administration.setToAccruedUser, $$administration.$regAfter, $$administration.setRegAfter])

  // console.log("toAccruedUser", toAccruedUser)
  const date = regAfter ? new Date(regAfter) : null
  // console.log("regAfter", date?.toISOString())

  const [giveUser, giveUsersRegisteredAfter, giveAllUsers, giveActiveUsers, exportTickets] = useUnit([$$administration.submitedGiveUser, $$administration.submitedGiveUsersRegisteredAfter, $$administration.submitedGiveAllUsers, $$administration.submitedGiveActiveUsers, $$administration.submitedExportTickets])

  const giveUserHandler = () => {
    toAccruedUser.length ? giveUser() : $$alerts.showDanger('Введите логин пользователя')
    console.log("toAccruedUser", toAccruedUser)
  }

  const giveUsersRegisteredAfterHandler = () => {
    date?.toISOString() ? giveUsersRegisteredAfter(date?.toISOString()) : $$alerts.showDanger('Введите дату регистрации')
  }

  return (
    <PageLayout.CloudCustom
      header={{ title: 'Начислить уникальные номера' }}
    >
      <div>
        <div className={styles.description}>
          <p>Выберите пользователя или начислите всем</p>
        </div>
        <div className={styles.row}>
          <input
            className={styles.administrationInput}
            placeholder="Login"
            value={toAccruedUser}
            onChange={(e) => setToAccruedUser(e.target.value)}
          />
          <div className={styles.buttons_row}>
            <MemoButton
              onClick={giveUserHandler}
            >Начислить пользователю</MemoButton>

            <MemoButton
              onClick={giveAllUsers}
            >Начислить всем</MemoButton>

            <MemoButton
              onClick={giveActiveUsers}
            >Начислить всем активным</MemoButton>
          </div>
        </div>

        <div className={styles.row}>
          <input
            type='date'
            className={regAfter ? styles.administrationInputDate : styles.administrationInputDateCustomColor}
            value={regAfter}
            onChange={(e) => setRegAfter(e.target.value)}
          />
          <div className={styles.buttons_row}>

            <MemoButton
              onClick={giveUsersRegisteredAfterHandler}
            >Начислить зарег после</MemoButton>

            <MemoButton
              onClick={exportTickets}
            >Скачать таблицу</MemoButton>
          </div>
        </div>
        <div></div>
      </div>
    </PageLayout.CloudCustom>
  )
}

export default AdministrationPage
