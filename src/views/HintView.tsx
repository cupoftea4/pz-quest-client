import { useMemo } from "react"
import {ReactComponent as QrCode} from '../assets/qrcode.svg';
import './Hint.css'

const HintView = () => {
  const hint = useMemo(() => localStorage.getItem('hint'), [])
  
  return (
    <div className="app">
      <div className='container'>
        <div className='qrcode'>
          <h1>Знайдіть та проскануйте QR-код, щоб отримати наступне завдання</h1>
          <QrCode />
        </div>
        <div className='hint'>
          <h1>Підказка</h1>
          <p>{hint}</p>
        </div>
      </div>
      <div className='feedback'>Contact dev <a href='https://t.me/lpnu_timetable'>@lpnu_timetable</a></div>
    </div>
  )
}

export default HintView;