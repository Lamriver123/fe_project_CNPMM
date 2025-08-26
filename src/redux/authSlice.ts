import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../api/authApi';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunks
export const register = createAsyncThunk('auth/register', async (data: any, thunkAPI) => {
  try {
    return await authApi.registerUser(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Register failed');
  }
});

export const login = createAsyncThunk('auth/login', async (data: any, thunkAPI) => {
  try {
    return await authApi.loginUser(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (token: string, thunkAPI) => {
  try {
    return await authApi.getUserProfile(token);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetch profile failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      // login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.token = action.payload.token; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      // fetch profile
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(fetchProfile.rejected, (state) => { state.loading = false; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
