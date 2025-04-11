import { useTodo } from '../contexts/TodoContext';
import AddTask from './AddTask';

const ToDo = () => {
  const { tasks, loading, error, highlightedTaskId, errorMessage } = useTodo(); 

  if (error) {
    return <div>Something Went Wrong! Please Try Again</div>;
  }

  return (
    <div className="flex flex-col items-left justify-center h-full">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">To Do List!</h2>
      {loading && <div>Loading...</div>}

      {!loading && (
        <div>
          <AddTask />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
        </div>
      )}
    </div>
  );
};

export default ToDo;
