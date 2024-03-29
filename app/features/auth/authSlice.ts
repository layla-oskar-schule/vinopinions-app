import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { HttpStatusCode } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { fetchCurrentUser, login, signup } from '../../api/api';
import { Credentials } from '../../auth/AuthContext';

const TOKEN_KEY = 'api-jwt';

export type AuthState =
  | {
      status: 'idle' | 'loading';
      authenticated: boolean;
    }
  | {
      status: 'succeeded';
      authenticated: boolean;
      accessToken: string;
    }
  | {
      status: 'failed';
      error: string;
    };

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials): Promise<string> => {
    const response = await login(credentials);
    const token = response.data.access_token;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    SecureStore.setItemAsync(TOKEN_KEY, token);
    return token;
  },
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (credentials: Credentials) => {
    const response = await signup(credentials);
    return response.data;
  },
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  delete axios.defaults.headers.common.Authorization;

  return await SecureStore.deleteItemAsync(TOKEN_KEY);
});

export const loadAccessTokenAsync = createAsyncThunk(
  'auth/loadAccessToken',
  async (): Promise<string> => {
    // load token from secure store
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // fail if no token was found
    if (!token) {
      return Promise.reject();
    }

    // check if the token is still valid by sending a request to a protected endpoint of the api
    const checkResponse = await fetchCurrentUser({
      headers: {
        Authorization: 'Bearer ' + token,
      },
      // allow all responses to prevent error interceptors to be called
      validateStatus: () => true,
    });

    if (checkResponse.status !== HttpStatusCode.Ok) {
      return Promise.reject();
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
  },
);

const initialState: AuthState = {
  status: 'idle',
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.authenticated = true;
          state.accessToken = action.payload;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(signupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.accessToken = null;
          state.authenticated = false;
        }
      })
      .addCase(loadAccessTokenAsync.rejected, (state) => {
        state.status = 'failed';
        axios.defaults.headers.common.Authorization = '';
      })
      .addCase(loadAccessTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAccessTokenAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.accessToken = action.payload;
          state.authenticated = true;
        }
      });
  },
});

export default authSlice.reducer;
