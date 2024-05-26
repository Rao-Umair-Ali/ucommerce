import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        updateFromCart(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    ...action.payload
                };
            }
        }
    }
})

export const { addToCart, deleteFromCart, updateFromCart } = todoSlice.actions;

export default todoSlice.reducer;
