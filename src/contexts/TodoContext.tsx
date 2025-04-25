import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../utils/types';

interface TodoContextType {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  newTask: string;
  highlightedTaskId: number | null;
  errorMessage: string | null;
  setNewTask: (task: string) => void;
  handleAddTask: () => Promise<void>;
  setErrorMessage: (message: string | null) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const {
    tasks,
    loading,
    error,
    highlightedTaskId,
    errorMessage,
    addTask,
    setErrorMessage
  } = useTasks();
  
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      setErrorMessage('Input Task and then Add');
      return;
    }
    const success = await addTask(newTask);
    if (success) {
      setNewTask('');
    }
  };

  const value: TodoContextType = {
    tasks,
    loading,
    error,
    newTask,
    highlightedTaskId,
    errorMessage,
    setNewTask,
    handleAddTask,
    setErrorMessage
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export default TodoProvider;