import React from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { AddInput, TaskList } from './components';

const Main = () => {
  const { addTask } = useTasks();

  const onAddTask = (value: string) => {
    if (!value) return alert('Please enter a task');
    addTask(value);
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="flex bg-neutral-100 p-1">
        <h1 className="flex-1">Task Manager</h1>
        <p className="flex gap-1">
          <b>Adrian</b>
          Iacuone
        </p>
      </header>
      <div className="flex flex-col gap-2 p-3 flex-1 overflow-hidden">
        <AddInput onAdd={onAddTask} />
        <div className="flex flex-col gap-2 overflow-y-auto h-full">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <Main />
  </TaskProvider>
);

export default App;
