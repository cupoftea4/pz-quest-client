import { TeamState } from "../App"
import { CheckAnswerResponse, SkipResponse, TasksResponse } from "../types/api"
import { fetchJson } from "./fetch";
import { toast } from 'react-toastify';

export function getTasks(): Promise<TasksResponse | TeamState> {
  return fetchJson<TasksResponse>(location.pathname, 'POST', { teamName: localStorage.getItem('teamName') }).then(res => {
    if (res.status === "won") {
      win()
      return "finished";
    }
    localStorage.setItem("score", res.score.toString())
    if (res.status === "cheated") {
      toast.success(res.message)
      return "task";
    }
    return res;
  }).catch(err => {
    toast.error(err.message)
    return "hint";
  })
}

export function submitAnswer(answer: string, isSimple: boolean): Promise<TeamState> {
  return fetchJson<CheckAnswerResponse>(
    "/check-answer", 'POST',
    { teamName: localStorage.getItem('teamName'), answer, isSimple
  }).then(res => {
    console.log(res)
    if (res.status === "wrong") {
      toast.error("Ви відповіли неправильно!")
      return "task";
    }
    localStorage.setItem("score", res.score.toString())
    if (res.status === "correct") {
      toast.success("Відповідь правильна!")
      hint(res.hint);
      return "hint";
    } else if (res.status === "won") {
      win();
      return "finished";
    }
    return "task";
  }).catch(err => {
    toast.error(err.message)
    return "task";
  })
}

export function skipTask(): Promise<TeamState> {
  console.log("Skipping")
  return fetchJson<SkipResponse>("/skip", 'POST', { teamName: localStorage.getItem('teamName') })
    .then(res => {
      console.log("Skipping", res)
      if (res.status === "won") {
        console.log("Won")
        win()
        return "finished";
      } else {
        hint(res.hint)
        return "hint";
      }
    })
    .catch(err => {
      console.log("Skipping", err)
      toast.error(err.message)
      return "task";
    })
}

function win() {
  localStorage.setItem("finished", "true");
  toast.success("Вітаємо! Ви відповіли правильно на всі питання!")
}

function hint(hint?: string) {
  if (!hint) return;
  localStorage.setItem("hint", hint);
}