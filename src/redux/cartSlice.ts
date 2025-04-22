import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
    } as CartState,
    reducers: {
        addProduct: (state: CartState, action: { payload: CartItem }) => {
            state.items.push(action.payload);
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state: CartState, action: { payload: { id: string } }) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.totalQuantity -= 1;
        }, 
        clearCart: (state: CartState) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    }
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;