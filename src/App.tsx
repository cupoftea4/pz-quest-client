import { createContext, useEffect, useState } from "react";
import RegisterView from "./Register";
import TaskView from "./Task";
import HintView from "./Hint";
import WinWindow from "./WinWindow";

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
        : state === "task" ? <RegisterView />
        : state === "hint" ? <HintView />
        : state === "finished" ? <WinWindow finalScore={localStorage.getItem("finished")} />
        : <RegisterView />
      }
    </AppStateContext.Provider>
  )
}

export default App