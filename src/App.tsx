import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("")
  const [task] = useState("Current task")
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
              <img className='image' src={""} alt="Task image"/>
            </div>
            <div>{task}</div>
            <textarea
              placeholder="Введіть відповідь сюди" rows={5} className='input' 
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
          <div>Contact dev @aler1x @cupoftea4</div>
        </div>
      </div>
    </>
  )
}

export default App;
