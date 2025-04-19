import React from 'react'
import { Task } from '../types'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const showSubtasks = !!task.subtasks?.length

  return (
    <div
      className="bg-blue-500"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        backgroundColor: task.parentId ? '#f9f9f9' : '#fff',
        marginLeft: task.parentId ? '2rem' : '0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <strong>{task.title}</strong>
        </div>
      </div>
      {showSubtasks &&
        task.subtasks.map((subtask) => (
          <TaskItem key={subtask.id} task={subtask} />
        ))}
    </div>
  )
}
