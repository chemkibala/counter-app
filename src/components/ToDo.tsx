import { useTodo } from '../contexts/TodoContext';
import AddTask from './AddTask';

const Todo = () => {
  const { tasks, loading, error, highlightedTaskId } = useTodo();

  if (error) {
    return <div>Something Went Wrong! Please Try Again</div>;
  }

  return (
    <div className="flex flex-col items-left justify-center h-full">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">To Do List!</h2>
      <AddTask />
      {loading && <div>Loading...</div>}
      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks yet. Add your first task above!</p>
      )}

      {tasks.length > 0 && (
        <ul className="text-lg text-gray-700">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`w-3/4 py-1 px-2 ${task.id === highlightedTaskId ? 'bg-green-100' : ''}`}
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
