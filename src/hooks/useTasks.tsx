import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../utils/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?_limit=5`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (e) {
        const error = e instanceof Error ? e : new Error('An unknown error occurred');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (title: string): Promise<boolean> => {
    setErrorMessage(null);
    if (!title.trim()) {
      setErrorMessage('Input Task and then Add');
      return false;
    }

    
    setLoading(true);
    
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      const newTask = { ...data, id: uuidv4() };
      
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setHighlightedTaskId(newTask.id);
      
      // setTimeout(() => setHighlightedTaskId(null), 2000);
      
      return true;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('An unknown error occurred');
      setError(error);
      console.error('Error adding task:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    highlightedTaskId,
    errorMessage,
    addTask,
    setErrorMessage,
    setHighlightedTaskId
  };
};
