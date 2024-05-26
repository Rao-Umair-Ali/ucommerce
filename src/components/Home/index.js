import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart, updateFromCart } from '../../redux/slice/todo';

function Home() {
  const [name, setName] = useState({
    id: 0,
    user: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.todo);

  const handleChange = (event) => {
    setName({
      id: name.id || Math.random(),
      user: event.target.value
    });
  };

  const addCart = (item) => {
    dispatch(addToCart(item));
    resetForm();
  };

  const updateCart = (item) => {
    dispatch(updateFromCart(item));
    resetForm();
    setIsEditing(false);
  };

  const editItem = (item) => {
    setName(item);
    setIsEditing(true);
  };

  const resetForm = () => {
    setName({
      id: 0,
      user: ''
    });
  };

  return (
    <div>
      <input type='text' value={name.user} onChange={handleChange} />
      <button onClick={() => isEditing ? updateCart(name) : addCart(name)}>
        {isEditing ? 'Update' : 'Add'}
      </button>
      {cartItems.map((item) => (
        <li key={item.id}>
          {item.user}
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => dispatch(deleteFromCart(item))}>Delete</button>
        </li>
      ))}
    </div>
  );
}

export default Home;
