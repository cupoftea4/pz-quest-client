import { useContext, useState } from 'react';
import './Register.css'
import { AppStateContext } from './App';
import { toast } from 'react-toastify';
import { registerTeam } from './utils/api';

const RegisterView = () => {
  const [teamName, setTeamName] = useState('');
  const [, setState] = useContext(AppStateContext);

  const register = () => {
    if (teamName === '') {
      toast.error('Введіть назву вашої команди')
      return
    }

    registerTeam(teamName).then(setState);
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
