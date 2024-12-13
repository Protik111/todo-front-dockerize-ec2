import React, { useState } from "react";

interface Todo {
  id?: string;
  title: string;
  time: string;
  status: string;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
          className="flex-grow border rounded px-2 py-1"
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo?.title}
        </span>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
