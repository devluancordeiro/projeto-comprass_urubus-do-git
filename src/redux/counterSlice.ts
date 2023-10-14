import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  [key: number]: number;
}

const initialState: CounterState = {};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increaseItemCount: (state, action: PayloadAction<number>) => {
      if (state[action.payload]) {
        state[action.payload] += 1;
      } else {
        state[action.payload] = 1;
      }
    },
    reduceItemCount: (state, action: PayloadAction<number>) => {
      if (state[action.payload]) {
        if (state[action.payload] !== 1) {
          state[action.payload] -= 1;
        } else {
          delete state[action.payload];
        }
      }
    },
    deleteItemCount: (state, action: PayloadAction<number>) => {
      if (state[action.payload] > 0) {
        state[action.payload] = 0;
        delete state[action.payload];
      }
    },
  },
});

export const {increaseItemCount, reduceItemCount, deleteItemCount} =
  counterSlice.actions;

export default counterSlice.reducer;
