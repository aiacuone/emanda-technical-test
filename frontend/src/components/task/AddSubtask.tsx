import React, { useState } from 'react';
import { Button } from '../Button';
import { AddInput } from '../AddInput';
import { useTasks } from '../../context/TaskContext';

interface AddSubtaskProps {
  taskId: number;
}

export const AddSubtask: React.FC<AddSubtaskProps> = ({ taskId }) => {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  const onClickAddTask = () => setIsOpen(true);

  const onAddTask = (value: string) => {
    addTask(value, taskId);
    setIsOpen(false);
  };

  if (isOpen)
    return (
      <AddInput
        onClose={() => setIsOpen(false)}
        onAdd={onAddTask}
        placeholder="New Subtask"
      />
    );

  return (
    <div>
      <Button onClick={onClickAddTask}>Add Subtask</Button>
    </div>
  );
};
