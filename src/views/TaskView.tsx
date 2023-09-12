import { useContext, useEffect, useState } from 'react'
import { FETCH_ORIGIN } from '../utils/fetch'
import { Task, TasksResponse } from '../types/api'
import { AppStateContext } from '../App'
import { getTasks, skipTask, submitAnswer } from '../utils/api'
import './Task.css'

function TaskView() {
  const [, setState] = useContext(AppStateContext);
  const [answer, setAnswer] = useState("")
  const [tasks, setTasks] = useState<TasksResponse>()
  const [isHard, setIsHard] = useState(false)
  const [task, setTask] = useState<Task>()

  useEffect(() => {
    getTasks().then(res => {
      if (typeof res === "string") {
        setState(res)
        return
      }
      setTasks(res)
    })
  }, [setState])

  useEffect(() => {
    if (tasks) {
      setTask(isHard ? tasks.tasks.hard : tasks.tasks.simple)
    }
  }, [tasks, isHard])

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
                width={250} alt="Task image"
              />}
          </div>
          <div className='question'>{task?.question}</div>
          <textarea
            placeholder="Введіть відповідь" rows={4} className='input' 
            onChange={e => setAnswer(e.currentTarget.value)}/>
        </div>
      </div>
      <div>
        <button className="button submit" onClick={() => submitAnswer(answer, !isHard).then(setState)}>
          Перевірити
        </button>
        <button className="button" onClick={() => skipTask().then(state => {
          console.log("NEW team state:", state)
          setState(state)
        })}>
          Пропустити
        </button>
      </div>
      <div className='feedback'>Contact dev <a href='https://t.me/lpnu_timetable'>@lpnu_timetable</a></div>
    </div>
  )
}

export default TaskView;
