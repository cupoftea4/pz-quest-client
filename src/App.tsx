import { createContext, useEffect, useState } from "react";
import RegisterView from "./RegisterView";
import TaskView from "./TaskView";
import HintView from "./HintView";
import WinView from "./WinView";

type AppState = "new" | "hint" | "task" | "finished"

export const AppStateContext = createContext<[AppState, (state: AppState) => void]>(['new', () => {}]);

const App = () => {
  const [state, setState] = useState<AppState>("new");
  console.log(state)

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
    </AppStateContext.Provider>
  )
}

export default App