import { useTodo } from '../contexts/TodoContext';

const AddTask = () => {
  const { newTask, setNewTask, handleAddTask, errorMessage } = useTodo();

  const onAddClick = () => {
    if (!newTask.trim()) {
      handleAddTask(); 
    } else {
      handleAddTask();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-1 rounded w-3/4"
          placeholder="Add the new task here"
        />
        <button 
          onClick={onAddClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default AddTask;
