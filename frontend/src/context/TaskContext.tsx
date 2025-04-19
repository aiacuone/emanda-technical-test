import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types";
import { fetchTasks, createTask, deleteTask } from "../api/tasks";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, parentId?: number) => Promise<void>;
  removeTask: (id: number, parentId?: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = async (title: string, parentId?: number) => {
    try {
      await createTask(title, parentId);

      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(`Error adding ${parentId ? "subtask" : "task"}:`, error);
    }
  };

  const removeTask = async (id: number, parentId?: number) => {
    try {
      await deleteTask(id, parentId);

      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(`Error deleting ${parentId ? "subtask" : "task"}:`, error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
