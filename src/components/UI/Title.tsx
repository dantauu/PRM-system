import ITitle from '../../interfaces/ITitle'
import './stylesUI/Title/Title.css'
import React, { FC } from 'react'

const Title: FC<ITitle> = ({ children }) => {
  return <div className="Title">{children}</div>
}

export default Title
