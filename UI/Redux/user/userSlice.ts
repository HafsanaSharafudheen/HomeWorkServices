import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User interface as defined
export interface User {
  _id?: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  password?: string;
  address: string;
  
}

// State structure for the slice
interface SignupState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SignupState = {
  user: null,
  loading: false,
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Start the signup process
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Successful signup
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    // Failed signup
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset state for a fresh signup process
    resetState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { signupStart, signupSuccess, signupFailure, resetState } = userSlice.actions;
export default userSlice.reducer;
