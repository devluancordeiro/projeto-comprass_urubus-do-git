import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
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
        if (state[action.payload] > 2) {
          state[action.payload] -= 1;
        } else {
          delete state[action.payload];
        }
      }
    },
    reduceItemCountWithoutRemove: (state, action: PayloadAction<number>) => {
      if (state[action.payload] >= 1) {
        state[action.payload] -= 1;
      }
    },
    deleteItemCount: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    resetItemCount: () => initialState,
  },
});

export const {
  increaseItemCount,
  reduceItemCount,
  reduceItemCountWithoutRemove,
  deleteItemCount,
  resetItemCount,
} = counterSlice.actions;

export default counterSlice.reducer;
