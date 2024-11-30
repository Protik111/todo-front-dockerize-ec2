import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
// import axios from 'axios';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    // Commented out API call for future use
    // const fetchTodos = async () => {
    //   try {
    //     const response = await axios.get('https://api.example.com/todos');
    //     setTodos(response.data);
    //   } catch (error) {
    //     console.error('Error fetching todos:', error);
    //   }
    // };
    // fetchTodos();
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever the todos state changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);

    // Commented out API call for future use
    // axios.post('https://api.example.com/todos', newTodo);
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );

    // Commented out API call for future use
    // axios.put(`https://api.example.com/todos/${id}`, { text: newText });
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // Commented out API call for future use
    // const todoToToggle = todos.find(todo => todo.id === id);
    // if (todoToToggle) {
    //   axios.put(`https://api.example.com/todos/${id}`, { completed: !todoToToggle.completed });
    // }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    // Commented out API call for future use
    // axios.delete(`https://api.example.com/todos/${id}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-red-900">Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default App;
