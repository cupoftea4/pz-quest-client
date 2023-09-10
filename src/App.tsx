import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("")
  const [task] = useState("Current task")
  const [taskNumber, setTaskNumber] = useState(0)
  const [answerComplexity, setAnswerComplexity] = useState("easy");

  function submitAnswer() {
    console.log(answer)
    console.log(answerComplexity)
    setTaskNumber(taskNumber + 1)
  }

  return (
    <>
      <div className="App">
        <div className='container'>
          <input type='checkbox' className='switch' onChange={() => setAnswerComplexity(answerComplexity === "easy" ? "hard" : "easy")}/>
          <h1>Завдання {taskNumber + 1}</h1>
          <div>
            <img className='image' src=""/>
          </div>
          <div>{task}</div>
          <input placeholder="Введіть відповідь сюди" type="text" className='input' onChange={e => setAnswer(e.currentTarget.value)}/>
        </div>
        <div>
          <button onClick={() => submitAnswer()}>
            Перевірити
          </button>
        </div>
      </div>
    </>
  )
}

export default App;
