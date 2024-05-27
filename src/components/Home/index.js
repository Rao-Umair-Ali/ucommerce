import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addToCart, deleteFromCart, updateFromCart } from '../../redux/slice/todo/index';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);
  const status = useSelector(state => state.todo.status);
  const [newTodoText, setNewTodoText] = useState('');
  const [updateTodoText, setUpdateTodoText] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    if (newTodoText.trim()) {
      dispatch(addToCart({ text: newTodoText.trim() }));
      setNewTodoText('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleSelectTodo = (id, currentText) => {
    setSelectedTodoId(id);
    setUpdateTodoText(currentText);
  };

  const handleUpdate = () => {
    if (updateTodoText.trim() && selectedTodoId) {
      dispatch(updateFromCart({ id: selectedTodoId, text: updateTodoText.trim() }));
      setSelectedTodoId(null);
      setUpdateTodoText('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading todos</p>}
      
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={handleAdd}>Add Todo</button>
      </div>

      {todos.map(todo => (
        <div key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button onClick={() => handleSelectTodo(todo.id, todo.text)}>Edit</button>
        </div>
      ))}

      {selectedTodoId && (
        <div>
          <input
            type="text"
            value={updateTodoText}
            onChange={(e) => setUpdateTodoText(e.target.value)}
            placeholder="Update todo"
          />
          <button onClick={handleUpdate}>Update Todo</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
