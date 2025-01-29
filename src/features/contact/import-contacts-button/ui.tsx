import { CreateContactData } from '@/shared/api'
import { Button, MemoButton } from '@/shared/components'
import { $$importContacts } from '@/shared/effector'
import { myMoment } from '@/shared/tools'
import { useUnit } from 'effector-react'
import { ChangeEvent, useId, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { parse } from 'vcf'
import { read, utils } from 'xlsx'

export const ImportContactsButton = () => {
  // Effector
  const [pending, submited] = useUnit([$$importContacts.$pending, $$importContacts.submited])

  // Id
  const inputId = useId()

  // State
  const [show, setShow] = useState<boolean>(false)

  // Handlers
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const file = event.target.files[0]
    const reader = new FileReader()

    if (file.name.endsWith('.xlsx')) {
      reader.readAsBinaryString(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) {
          return
        }
        const data = e.target.result
        const workbook = read(data, { type: 'binary' })
        const firstSheet = workbook.SheetNames[0]
        const sheet = utils.sheet_to_json(workbook.Sheets[firstSheet]) as CreateContactData[]
        const contacts = sheet.map(({ birth_date, ...data }) => ({
          birth_date: myMoment(birth_date).format('YYYY-MM-DDTHH:mm:ss.SSS'),
          ...data,
        }))

        submited(contacts)
        setShow(false)
      }
    } else if (file.name.endsWith('.vcf') || file.name.endsWith('.vcard')) {
      reader.readAsText(file)

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) {
          return
        }
        const data = e.target.result
        const dataString = typeof data === 'string' ? data : new TextDecoder('utf-8').decode(data)
        const parsedContacts = parse(dataString)
        const contacts = parsedContacts.map((contact) => {
          const fullName = contact.data.fn?.valueOf() || ''
          const nameParts = typeof fullName === 'string' ? fullName.split(' ') : []
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1, 2).join(' ') || ''
          const birthDate = '01-01-2001'
          const formattedBirthDate = birthDate
            ? myMoment(birthDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
            : ''
          const phone = Array.isArray(contact.data.tel)
            ? contact.data.tel[0]?.valueOf()
            : contact.data.tel?.valueOf() || ''

          return {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            telegram_ID: '',
            city: '',
            country: '',
            profession: '',
            birth_date: formattedBirthDate,
            comment: '',
            avatar: '',
          }
        })

        submited(contacts)
        setShow(false)
      }
    }
  }

  return (
    <>
      <MemoButton onClick={!pending ? () => setShow(true) : undefined}>Импорт</MemoButton>
      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Импорт контактов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Чтобы импортировать контакты, требуется загрузить Excel файл <b>(.xlsx, .vcf, .vcard)</b>
          <br />
          Шаблон файла можно открыть по{' '}
          <a
            href="https://docs.google.com/spreadsheets/d/1wYFQDRUb3uh3g3q6wEXkiS-rQV3jlK-jtxQ-s-FNSd8/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            ссылке
          </a>
          <br />
          Обратите внимание, все ячейки должны быть формата: <i>Обычный текст</i>
        </Modal.Body>
        <Modal.Footer>
          <input
            id={inputId}
            type="file"
            onChange={handleChange}
            hidden
            accept={'.xlsx,.vcf,.vcard'}
          />
          <label htmlFor={inputId}>
            <div className="button button--primary">Загрузить файл</div>
          </label>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
