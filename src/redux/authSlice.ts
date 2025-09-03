import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, LoginResponse } from "../types/User";

export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    payload: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("http://localhost:6969/v1/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: LoginResponse = await res.json();
      // console.log("Backend response:", data); // Debug log

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Extract token and user from data object
      const { accessToken, refreshToken, user } = data.data || {};

      console.log("Extracted data:", { accessToken, refreshToken, user }); // Debug log

      return {
        success: true,
        token: accessToken, // Backend trả về accessToken
        refreshToken: refreshToken,
        user: user
      } as {
        success: boolean;
        token: string;
        refreshToken?: string;
        user?: User;
      };
    } catch (e: any) {
      return rejectWithValue(
        e?.message?.includes("fetch")
          ? "Cannot connect to server"
          : "Network error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

      }
    },
    setToken(state, action: PayloadAction<{ token: string; refreshToken?: string }>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken ?? null;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.user = action.payload.user ?? null;

        // Save token to localStorage for axios interceptor
        if (typeof localStorage !== "undefined" && action.payload.token) {
          localStorage.setItem("access_token", action.payload.token);
          if (action.payload.refreshToken) {
            localStorage.setItem("refresh_token", action.payload.refreshToken);
          }
          if (action.payload.user) {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const { logout, setToken, updateUser } = authSlice.actions;
export default authSlice.reducer;
