import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem(
        "cart",
        JSON.stringify(store.getState().cart.items)
    );
});

export default store;