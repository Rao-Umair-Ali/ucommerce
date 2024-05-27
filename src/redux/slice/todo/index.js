import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/firebaseConfig';
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs } from 'firebase/firestore';

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

// Async Thunks for Firebase operations
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk('todos/addToCart', async (newTodo, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    return { id: docRef.id, ...newTodo };
  } catch (error) {
    console.error("Error adding todo:", error);
    return rejectWithValue(error.message);
  }
});

export const deleteFromCart = createAsyncThunk('todos/deleteFromCart', async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'todos', id));
    return id;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return rejectWithValue(error.message);
  }
});

export const updateFromCart = createAsyncThunk('todos/updateFromCart', async (updatedTodo, { rejectWithValue }) => {
  const { id, ...fields } = updatedTodo;
  try {
    await updateDoc(doc(db, 'todos', id), fields);
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    return rejectWithValue(error.message);
  }
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateFromCart.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  }
});

export default todoSlice.reducer;
