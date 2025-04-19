import React from 'react'
import { Task } from '../types'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const showSubtasks = !!task.subtasks?.length

  return (
    <div
      className={`rounded-lg p-3 my-2 border border-gray-300 flex flex-col ${
        task.parentId ? 'ml-8 bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <strong>{task.title}</strong>
        </div>
        <button className="text-white bg-red-500 rounded px-[5px] py-[1px] text-sm cursor-pointer border-none">
          X
        </button>
      </div>
      {showSubtasks &&
        task.subtasks?.map((subtask) => (
          <TaskItem key={subtask.id} task={subtask} />
        ))}
    </div>
  )
}
