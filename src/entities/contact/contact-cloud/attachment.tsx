import './attachment.scss'
import { AttachmentIcon } from '@/shared/assets'
import React, { type DetailedHTMLProps, type InputHTMLAttributes } from 'react'

interface AttachmentTypes
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  accept?: '.png, .jpg'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Attachment({ accept = '.png, .jpg', onChange, ...rest }: AttachmentTypes) {
  return (
    <div className="attachment-wrapper">
      <label htmlFor="input-file">
        <AttachmentIcon
          width={34}
          height={34}
          className="icon"
        />
        <input
          id="input-file"
          onChange={(e) => onChange(e)}
          className="attachment-input"
          accept={accept}
          {...rest}
        />
      </label>
    </div>
  )
}

export default Attachment
