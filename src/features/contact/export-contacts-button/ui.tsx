import { Button, MemoButton } from '@/shared/components'
import { $$contacts } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { utils, writeFile } from 'xlsx'

export const ExportContactsButton = () => {
  // Effector
  const contacts = useUnit($$contacts.$items)

  // State
  const [show, setShow] = useState<boolean>(false)

  // Handlers
  const handleChange = () => {
    if (contacts.length === 0) {
      return
    }

    const worksheet = utils.json_to_sheet(contacts)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Contacts')
    writeFile(workbook, 'contacts.xlsx')

    setShow(false)
  }

  return (
    <>
      <MemoButton onClick={() => setShow(true)}>Экспорт</MemoButton>
      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Экспорт контактов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Нажмите кнопку ниже, чтобы экспортировать контакты в файл Excel <b>(.xlsx)</b>.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleChange}
          >
            Экспортировать
          </Button>
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
