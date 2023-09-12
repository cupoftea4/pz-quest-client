export type RegisterResponse = {
  hint: string
} 

export type CheckAnswerResponse = {
  score: number
  status: "correct" | "wrong" | "won"
  hint?: CheckAnswerResponse["status"] extends "correct" ? string : undefined
}

export type SkipResponse = {
  hint: string
  status: "skipped" | "won"
  score: SkipResponse["status"] extends "won" ? number : undefined
}

export type Task = {
  id: string
  question: string
  level: number
  picture?: string
  canBeAutoChecked?: boolean
}

export type TasksResponse = {
  tasks: {
    simple: Task
    hard: Task
  }
  score: number
  currentTask: number
  status: "playing" | "won" | "cheated"
  message?: TasksResponse["status"] extends "cheated" | "won" ? string : undefined
}

export type ErrorResponse = {
  message: string
}