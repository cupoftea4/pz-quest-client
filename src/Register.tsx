import { useContext, useState } from 'react';
import './Register.css'
import { fetchJson } from './utils/fetch';
import { RegisterResponse } from './types/api';
import { AppStateContext } from './App';

const RegisterView = () => {
  const [teamName, setTeamName] = useState('');
  const [, setState] = useContext(AppStateContext);

  const register = () => {
    console.log('register ' + teamName);
    if (teamName === '') {
      alert('Введіть назву вашої команди')
      return
    }

    fetchJson<RegisterResponse>('/register', 'POST', { teamName }).then(res => {
      localStorage.setItem('teamName', teamName)
      localStorage.setItem('hint', res.hint)
      setState('hint')
      alert('Ви успішно зареєструвалися')
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <div className='app'>
      <div className="container">
        <h1>Введіть назву вашої команди</h1>    
        <input className='input' placeholder='cooldevs256' onChange={e => setTeamName(e.currentTarget.value)}/>  
      </div>
      <button onClick={register} className="button submit">
        Зареєструватися
      </button>
      <div className='feedback'>Contact dev <a href='https://t.me/lpnu_timetable'>@lpnu_timetable</a></div>
    </div>
  )
}

export default RegisterView;