import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
    items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addToCart: (state, action) => {
            const payload = action.payload;

            const product = payload.product ?? payload;
            const quantity = payload.quantity ?? 1;

            const existingProduct = state.items.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.items.push({
                    ...product,
                    quantity,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity -= 1;
            }

            state.items = state.items.filter(
                (item) => item.quantity > 0
            );
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;