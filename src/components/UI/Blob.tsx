import Blob2Image from '../../assets/landing/images/bl2.gif'
import IBlob from '../../interfaces/IBlob'
import './stylesUI/Blob/Blob.css'
import { FC } from 'react'

const Blob: FC<IBlob> = ({
  width,
  position,
  top = 'initial',
  left = 'initial',
  right = 'initial',
  bottom = 'initial',
}) => {
  return (
    <>
      <div
        className="Blob"
        style={{ width, position, top, bottom, left, right }}
      >
        <img
          className="blob-img"
          src={Blob2Image}
          alt="blob"
        />
      </div>
    </>
  )
}

export default Blob
