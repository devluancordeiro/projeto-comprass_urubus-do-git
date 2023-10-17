import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type OrderSlice = number;

const initialState: OrderSlice = 20;

const orderSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setOrderSlice: (_, action: PayloadAction<number>) => {
      if (action.payload) {
        return action.payload;
      } else {
        return 0;
      }
    },
  },
});

export const {setOrderSlice} = orderSlice.actions;

export default orderSlice.reducer;
