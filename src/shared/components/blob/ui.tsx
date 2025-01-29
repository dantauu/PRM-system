import BlobWebpBlue from './blob2.webp'
import BlobWebpBlack from './gifs/gif-black-opt.webp'
import BlobWebpWhite from './gifs/gif-white-opt.webp'
import './style.scss'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface BlobProps {
  className?: string
  children?: ReactNode
  image: 'BlobWebpBlue' | 'BlobWebpWhite' | 'BlobWebpBlack'
}

export const Blob: FC<BlobProps> = ({ className, image = 'BlobWebpBlue' }) => {
  // Variables

  const ClassName = classNames('my-blob', className)

  return (
    <div className={ClassName}>
      <img
        src={
          image === 'BlobWebpBlue'
            ? BlobWebpBlue
            : image === 'BlobWebpWhite'
              ? BlobWebpWhite
              : BlobWebpBlack
        }
        alt="blob"
        width="120px"
        height="120px"
      />
    </div>
  )
}

export const MemoBlob = memo(Blob)
