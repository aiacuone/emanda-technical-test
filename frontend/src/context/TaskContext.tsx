import React, { createContext, useContext, useEffect, useState } from 'react'
import { Task } from '../types'
import { fetchTasks, createTask, deleteTask } from '../api/tasks'
import { createSubtask, deleteSubtask } from '../api/subtasks'

interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, parentId?: number) => Promise<void>
  removeTask: (id: number, isParentTask: boolean) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  const addTask = async (title: string, parentId?: number) => {
    try {
      if (parentId) await createSubtask(title, parentId)
      else await createTask(title)

      const tasks = await fetchTasks()
      setTasks(tasks)
    } catch (error) {
      console.error(`Error adding ${parentId ? 'subtask' : 'task'}:`, error)
    }
  }

  const removeTask = async (id: number, isParentTask: boolean) => {
    try {
      if (isParentTask) await deleteTask(id)
      else await deleteSubtask(id)

      const tasks = await fetchTasks()
      setTasks(tasks)
    } catch (error) {
      console.error(
        `Error deleting ${isParentTask ? 'task' : 'subtask'}:`,
        error
      )
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within TaskProvider')
  return context
}
