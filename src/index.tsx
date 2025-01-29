import './index.scss'
import { App } from '@/app'
import { $$app } from '@/shared/effector'
import ReactDOM from 'react-dom/client'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
$$app.started()
