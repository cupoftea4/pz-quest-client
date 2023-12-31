import { createContext, useEffect, useState } from "react";
import RegisterView from "./views/RegisterView";
import TaskView from "./views/TaskView";
import HintView from "./views/HintView";
import WinView from "./views/WinView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type TeamState = "new" | "hint" | "task" | "finished"

export const AppStateContext = createContext<[TeamState, (state: TeamState) => void]>(['new', () => {}]);

const App = () => {
  const [state, setState] = useState<TeamState>("new");

  useEffect(() => {
    const isRegistered = localStorage.getItem("teamName")
    const isFinished = localStorage.getItem("finished")
    if (!isRegistered) {
      setState("new");
    } else if (isFinished) { 
      setState("finished");
    } else if (location.pathname === "/") {
      setState("hint");
    } else {
      setState("task");
    }
  }, [])

  return (
    <AppStateContext.Provider value={[ state, setState ]}>
      {
        state === "new" ? <RegisterView />
        : state === "task" ? <TaskView />
        : state === "hint" ? <HintView />
        : state === "finished" ? <WinView finalScore={localStorage.getItem("score")} />
        : <RegisterView />
      }
       <ToastContainer autoClose={2000} limit={1}/>
    </AppStateContext.Provider>
  )
}

export default App