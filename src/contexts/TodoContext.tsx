/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFetch from '../hooks/UseFetch';

interface Task {
  id: number;
  title: string;
}

interface TodoContextType {
  tasks: Task[];
  loading: boolean;
  error: any;
  newTask: string;
  highlightedTaskId: number | null;
  setTasks: (tasks: Task[]) => void;
  setNewTask: (newTask: string) => void;
  setHighlightedTaskId: (id: number | null) => void;
  handleAddTask: () => Promise<void>;
  errorMessage: string | null; 
  setErrorMessage: (message: string | null) => void; 
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const { tasks: fetchedTasks, loading, error, setTasks: setFetchedTasks } = useFetch(BASE_URL);

  const [tasks, setTasks] = useState<Task[]>(fetchedTasks);
  const [newTask, setNewTask] = useState('');
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  const handleAddTask = async () => {
    if (newTask.trim() === '') {
      setErrorMessage('Input Task and then Add'); 
      return; 
    }

    setErrorMessage(null); 

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTask })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: any = await response.json();
      const newTaskWithId = { ...data, id: uuidv4() };

      setTasks([newTaskWithId, ...tasks]);
      setFetchedTasks([newTaskWithId, ...fetchedTasks]);
      setHighlightedTaskId(newTaskWithId.id);
/* if you want to highlight the task for 2 seconds or specific seconds
      setTimeout(() => {
        setHighlightedTaskId(null);
      }, 2000);
*/
      setNewTask('');
    } catch (error: any) {
      console.error('Error adding task:', error);
    }
  };

  const value: TodoContextType = {
    tasks,
    loading,
    error,
    newTask,
    highlightedTaskId,
    setTasks,
    setNewTask,
    setHighlightedTaskId,
    handleAddTask,
    errorMessage, 
    setErrorMessage, 
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export default TodoProvider;
