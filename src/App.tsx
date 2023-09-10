import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("")
  const [taskNumber, setTaskNumber] = useState(0)

  function submitAnswer() {
    console.log(answer)
    setTaskNumber(taskNumber + 1)
  }

  return (
    <>
      <div className="App">
        Bad code
        <h1>Завдання {taskNumber + 1}</h1>
        <input type="text" className='input' onChange={e => setAnswer(e.currentTarget.value)}/>
        <button onClick={() => submitAnswer()}>
          Перевірити
        </button>
      </div>
    </>
  )
}

export default App
