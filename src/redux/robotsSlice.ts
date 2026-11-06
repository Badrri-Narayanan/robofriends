import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RobotDetails } from './types';

const ROBOTS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchRobots = createAsyncThunk('robots/fetch', async () => {
  const resp = await fetch(ROBOTS_URL);
  if (!resp.ok) {
    throw new Error(`Request failed with status ${resp.status}`);
  }
  return (await resp.json()) as RobotDetails[];
});

export type RobotsState = {
  isPending: boolean;
  robotsList: RobotDetails[];
  error: string;
};

const initialState: RobotsState = {
  isPending: false,
  robotsList: [],
  error: '',
};

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRobots.pending, (state) => {
        state.isPending = true;
        state.error = '';
      })
      .addCase(fetchRobots.fulfilled, (state, action) => {
        state.isPending = false;
        state.robotsList = action.payload;
      })
      .addCase(fetchRobots.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default robotsSlice.reducer;
