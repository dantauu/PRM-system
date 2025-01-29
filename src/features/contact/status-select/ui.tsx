import './style.scss';
import { $$activeContact } from '@/entities/contact/model';
import { ContactWithInfo } from '@/shared/api';
import { Form } from '@/shared/components';
import { $$activeStrategy, $$contactEditPage } from '@/shared/effector';
import { $$contactCustomStrategyStatuses, updateContactStatusFx } from '@/shared/effector/contact';
import classNames from 'classnames';
import { useStoreMap, useUnit } from 'effector-react';
import { FC, memo, useCallback } from 'react';


interface StatusSelectProps {
  className?: string

  size?: 'sm' | 'lg'
  contact: ContactWithInfo
}

export const StatusSelect: FC<StatusSelectProps> = ({ className, size = 'sm', contact }) => {
  // Effector
  const [statuses, strategyId] = useUnit([
    $$activeStrategy.$statuses,
    $$activeStrategy.$activeStrategyId,
  ])

  // const lastContact: ContactWithInfo = useUnit($$lastContact.$item)
  // const contactEditPage = useUnit($$contactEditPage.$contact)
  // const activeContact = useUnit($$activeContact.$item)

  // Variables
  const ClassName = classNames('status-select', className)

  const status = useStoreMap({
    store: $$contactCustomStrategyStatuses.$mapStatusToContactId,
    keys: [contact?.contact_id],
    fn: (items) => {
      return contact?.contact_id in items ? items[contact?.contact_id] : null
    },
  })

  const statusesForSelect = statuses?.map((status) => {
    // console.log("status", status)
    return {
      value: status.custom_strategy_status_id,
      text: status.name,
    }
  })

  const handleChange = useCallback(
    (value: number) => {
      if (strategyId) {

        const currentStatus = statuses.find((status) => status?.custom_strategy_status_id === value)

        let { custom_strategy_id, custom_strategy_status_id, ...data } = currentStatus

        // console.log("data", data)
        updateContactStatusFx({
          data: data,
          custom_strategy_status_id: value,
          contactId: contact.contact_id,
        })
      }
    },
    [strategyId]
  )

  if (!strategyId && !statuses) {
    return null
  }

  return (
    <Form.Select
      className={ClassName}
      size={size}
      items={statusesForSelect}
      value={status?.custom_strategy_status_id}
      onChange={handleChange}
    />
  )
}

export const MemoStatusSelect = memo(StatusSelect)