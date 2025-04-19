import React from 'react'
import { Task } from '../../types'
import { AddSubtask } from './AddSubtask'
import { CloseButton } from '../CloseButton'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const showSubtasks = !!task.subtasks?.length
  const isTask = !!task.subtasks

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
        <CloseButton onClick={() => {}} />
      </div>
      <div className="ml-4 flex flex-col gap-2">
        {showSubtasks &&
          task.subtasks?.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        {isTask && <AddSubtask taskId={task.id} />}
      </div>
    </div>
  )
}
