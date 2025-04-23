import { createSlice } from '@reduxjs/toolkit';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string; // Optional property for image URL
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}


// Check if localStorage is available and retrieve the cart items
// const initialState: CartState = {
//     items: typeof window !== 'undefined' && localStorage.getItem('cart')
//       ? JSON.parse(localStorage.getItem('cart')!)
//       : [],
//     totalQuantity: 0,
//     totalPrice: 0,
// };
  

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: typeof window !== 'undefined' && localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart')!) : [],
        totalQuantity: 0,
        totalPrice: 0,
    } as CartState,
    reducers: {
        addProduct: (state: CartState, action: { payload: CartItem }) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                state.totalPrice += action.payload.price * action.payload.quantity;
            } else {
                state.items.push(action.payload);
                state.totalQuantity += 1;
                state.totalPrice += action.payload.price * action.payload.quantity;
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }

        },
        removeProduct: (state: CartState, action: { payload: { id: string } }) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.totalQuantity -= 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        }, 
        clearCart: (state: CartState) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
        },
    }
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;