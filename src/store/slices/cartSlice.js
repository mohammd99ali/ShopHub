import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, image, images, description, stock } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                // Use the first image from images array if available, otherwise use image
                const productImage = images && images.length > 0 ? images[0] : image;

                // Ensure we have a valid image URL
                const finalImage = productImage && productImage.trim() !== '' ? productImage : null;

                state.items.push({
                    id,
                    name,
                    price,
                    image: finalImage,
                    description,
                    stock,
                    quantity: 1,
                });
            }

            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }

            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.itemCount = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
