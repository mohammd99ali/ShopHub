import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});

export default store;

// Persist cart to localStorage on changes
store.subscribe(() => {
    try {
        const state = store.getState();
        const cartState = state.cart;
        localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (_) {
        // Ignore write errors (e.g., private mode)
    }
});