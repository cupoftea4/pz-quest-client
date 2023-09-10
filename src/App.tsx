import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("")
  const [task] = useState(`Дайте відповідь на питання. Що це за структури даних ?
  A: {13, 6 ,56 ,3}
  B: {5, 13, 56, 3}
  С: {55, 2 , 0, 12}
  dfds
  dsflsajfdskjfkdskfjsdklfjkldsjfksdkjsfkjhdsjkhfdsj
  ds
  sfd`)
  const [taskNumber, setTaskNumber] = useState(0)
  const [isHard, setIsHard] = useState(false)

  function submitAnswer() {
    console.log(answer)
    setTaskNumber(taskNumber + 1)
  }

  return (
    <>
      <div className="app">
        <div className='container'>
          <div className="switch-button" onClick={() => setIsHard(!isHard)}>
            <span className={`active ${isHard && "switch-active"}`}></span>
            <button className={`switch-button-case left ${!isHard && "active-case"}`}>Easy</button>
            <button className={`switch-button-case right ${isHard && "active-case"}`}>Hard</button>
          </div>
          <div className='content'>
            <h1>Завдання {taskNumber + 1}</h1>
            <div>
              <img className='image' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg"} width={320} alt="Task image"/>
            </div>
            <div className='question'>{task}</div>
            <textarea
              placeholder="Введіть відповідь сюди" rows={4} className='input' 
              onChange={e => setAnswer(e.currentTarget.value)}/>
          </div>
        </div>
        <div>
          <button className="button submit" onClick={() => submitAnswer()}>
            Перевірити
          </button>
          <button className="button" onClick={() => submitAnswer()}>
            Пропустити
          </button>
        </div>
        <div className='feedback'>Contact dev <a href='https://t.me/lpnu_timetable'>@lpnu_timetable</a></div>
      </div>
    </>
  )
}

export default App;
