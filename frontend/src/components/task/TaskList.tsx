import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div className="flex flex-col gap-3">
      {tasks.length === 0 ? (
        <p>No top-level tasks found.</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};
