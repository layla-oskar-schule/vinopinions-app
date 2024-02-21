import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { fetchCurrentUser } from '../../api/api';
import User from '../../models/User';

type CurrentUserState = ApiResponseState<User>;

export const fetchCurrentUserAsync = createAsyncThunk<User>(
  'users/me',
  async () => {
    const response = await fetchCurrentUser();
    return response.data;
  },
);

const initialState: CurrentUserState = {
  data: undefined,
  status: 'idle',
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState as CurrentUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.data = action.payload;
        }
      })
      .addCase(fetchCurrentUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default currentUserSlice.reducer;
