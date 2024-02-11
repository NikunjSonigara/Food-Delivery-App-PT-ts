import { createSlice } from "@reduxjs/toolkit";
import { CartData } from "../../data";


export const CartSlice = createSlice({
    name: "cart",
    initialState: [] as CartData[],
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
        remove: (state, action) => {
            return state.filter((item: any) => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const updatedState = state.map((item: CartData) => {
                if (item.id === id) {
                    return { ...item, quantity };
                }
                return item;
            });
            state.splice(0, state.length, ...updatedState);
        }
    }
});

export const { add, remove, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;