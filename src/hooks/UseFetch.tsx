/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
}

const useFetch = (url: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}?_limit=5`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { tasks, loading, error, setTasks };
};

export default useFetch;
