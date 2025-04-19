import React from 'react'
import { TaskProvider, useTasks } from './context/TaskContext'
import { AddInput, TaskList } from './components'

const Main = () => {
  const { addTask } = useTasks()

  const onAddTask = (value: string) => addTask(value)

  return (
    <div className="flex flex-col gap-2 p-3">
      <h1>Task Manager</h1>
      <AddInput onAdd={onAddTask} />
      <TaskList />
    </div>
  )
}

const App = () => (
  <TaskProvider>
    <Main />
  </TaskProvider>
)

export default App
