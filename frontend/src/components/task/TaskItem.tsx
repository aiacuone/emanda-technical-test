import React from 'react'
import { Task } from '../../types'
import { AddSubtask } from './AddSubtask'
import { CloseButton } from '../CloseButton'
import { useTasks } from '../../context/TaskContext'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { removeTask } = useTasks()
  const hasSubtasks = task.subtasks?.length > 0
  const isTask = !!task.subtasks

  const onDeleteTask = async () => {
    if (hasSubtasks) return alert('Please delete all subtasks first')

    await removeTask(task.id, task.parentId)
  }

  return (
    <div
      className={`rounded-lg border border-gray-300 flex flex-col py-2 px-2 gap-2 ${
        isTask ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between ">
        <div>
          <strong>{task.title}</strong>
        </div>
        <CloseButton onClick={onDeleteTask} />
      </div>
      <div className="ml-4 flex flex-col gap-2">
        {hasSubtasks &&
          task.subtasks?.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        {isTask && <AddSubtask taskId={task.id} />}
      </div>
    </div>
  )
}
