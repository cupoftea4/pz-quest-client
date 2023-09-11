import { useEffect, useState } from 'react'
import './Task.css'
import { FETCH_ORIGIN, fetchJson } from './utils/fetch'
import { Task, TasksResponse } from './types/api'

function TaskView() {
  const [answer, setAnswer] = useState("")
  const [tasks, setTasks] = useState<TasksResponse>()
  const [taskNumber, setTaskNumber] = useState(0)
  const [isHard, setIsHard] = useState(false)
  const [task, setTask] = useState<Task>()

  useEffect(() => {
    fetchJson<TasksResponse>(location.pathname, 'POST', { teamName: localStorage.getItem('teamName') }).then(res => {
      console.log(res)
      setTasks(res)
    }).catch(err => {
      alert(err.message)
    })
  }, [])

  useEffect(() => {
    if (tasks) {
      setTask(isHard ? tasks.tasks.hard : tasks.tasks.simple)
    }
  }, [tasks, isHard])


  function submitAnswer() {
    console.log(answer)
    setTaskNumber(taskNumber + 1)
  }

  return (
    <div className="app">
      <div className='container'>
        <div className="switch-button" onClick={() => setIsHard(!isHard)}>
          <span className={`active ${isHard && "switch-active"}`}></span>
          <button className={`switch-button-case left ${!isHard && "active-case"}`}>Easy</button>
          <button className={`switch-button-case right ${isHard && "active-case"}`}>Hard</button>
        </div>
        <div className='content'>
          <h1>Завдання {tasks?.currentTask}</h1>
          <div>
            {task?.picture && 
              <img 
                className='image' 
                src={task.picture.startsWith("/") ? FETCH_ORIGIN + task.picture : task.picture} 
                width={320} alt="Task image"
              />}
          </div>
          <div className='question'>{task?.question}</div>
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
  )
}

export default TaskView;
