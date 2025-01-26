import PropTypes from "prop-types";

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <li
      className={`flex items-center justify-between p-3 rounded bg-gray-50 hover:bg-gray-100 ${
        task.isCompleted ? "line-through text-gray-500" : ""
      }`}
    >
      <span>{task.title}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onComplete(task.id)}
          className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Complete
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
