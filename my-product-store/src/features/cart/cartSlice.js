import { createSlice } from '@reduxjs/toolkit';

// 1. Define the raw data first
const initialState = {
    items: [],
};

// 2. Call the createSlice function and store it in cartSlice
const cartSlice = createSlice({
    name: 'cart',
    initialState, // This now correctly refers to the object above
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        // Logic to remove the item entirely
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // Logic to change quantity (+ / -)
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
    },
});

// 3. Export the actions and the reducer
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;